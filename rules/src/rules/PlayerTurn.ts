import {
  Location,
  MaterialItem,
  MaterialMoveType,
  MaterialRulesMove,
  MoveKind,
  PlayerRulesStep
} from '@gamepark/rules-api'
import Color from '../Color'
import { MaterialType } from '../material/ExpeditionMaterial'
import { LocationType } from '../material/ExpeditionLocations'
import { MainGameData } from '../types/MainGameData'
import { Node, roads } from '../material/Road'
import isEqual from 'lodash/isEqual'
import { ArrowColor } from '../material/ArrowColor'

export class PlayerTurn extends PlayerRulesStep<Color, MaterialType, LocationType> {
  getPlayerMoves() {
    const expeditions = this.getData<MainGameData>().expeditions

    const moves = this.initializeMoves()
    moves.push(
      ...[ArrowColor.Yellow, ArrowColor.Blue, ArrowColor.Red].flatMap((expedition) => {
        const arrowColor = expedition
        const allArrows = this.material(MaterialType.Arrow)

        const node = expeditions[arrowColor]
        const expeditionArrows = allArrows
          .search()
          .location(LocationType.Road)
          .filter((i) => i.id === arrowColor)
          .all()


        const targets = roads
          .filter((r) => {

            const isValid = node !== undefined ? true : expeditionArrows
              .filter((i) => !isEqual(i.location.id, r) && i.location.id.some((id: Node) => r.includes(id)))
              .length

            const isRoadOccupied = expeditionArrows
              .filter((i) => isEqual(i.location.id, r))
              .length

            return isValid && !isRoadOccupied && (node === undefined || (r[0] === node || r[1] === node))
          })

        const arrow = allArrows
          .search()
          .location(LocationType.ArrowsStock)
          .filter((item) => item.id === arrowColor && (item.quantity ?? 0) > 0)
          .moves()

        const moves = targets
          .flatMap((t) => arrow.moveTo(LocationType.Road, node === t[1] ? {
            id: t,
            orientation: {
              z: 180
            }
          } : { id: t }))

        return moves

      })
    )

    return moves
  }

  play(move: MaterialRulesMove<Color, MaterialType, LocationType>): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    if (move.kind === MoveKind.MaterialMove && move.itemsType === MaterialType.Arrow && move.type === MaterialMoveType.Move) {
      const arrows = this.material(MaterialType.Arrow)
      const item = arrows.items[move.item]
      const location = move.location

      if (location.type === LocationType.Road) {


        // Get expeditions
        const expeditions = this.getData<MainGameData>().expeditions

        const expeditionArrows = arrows
          .search()
          .location(LocationType.Road)
          .filter((i) => i.id === item.id)
          .all()

        const nextPlace = this.getNextPlaceForExpedition(move.location, expeditionArrows)
        if (nextPlace === undefined) {
          delete expeditions[item.id!]
        } else {
          expeditions[item.id!] = nextPlace
        }
      }
      return []
    }

    return super.play(move)
  }

  getNextPlaceForExpedition(location: Location<Color, LocationType, number>, expeditionArrows: MaterialItem<Color, LocationType, number>[]): Node | undefined {
    const endOfArrow = location.orientation?.z === 180 ? location.id![0] : location.id![1]
    const isLoop = expeditionArrows.some((arrow) => arrow.location.id!.some((place: number) => endOfArrow === place))
    if (isLoop) {
      return undefined
    }

    return endOfArrow

  }

  onMovePlayed(move: MaterialRulesMove<Color, MaterialType, LocationType>): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    if (move.kind === MoveKind.MaterialMove && move.itemsType === MaterialType.Arrow && move.type === MaterialMoveType.Move) {
      return [this.rulesMoves().nextStep(PlayerTurn, this.nextPlayer(), this.getData<MainGameData>())]
    }

    return []
  }
}

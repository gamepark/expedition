import { createMoveItemMove, MaterialMoveType, MaterialRulesMove, MoveKind, PlayerRulesStep } from '@gamepark/rules-api'
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

        return targets.flatMap((t) => createMoveItemMove(
          { type: MaterialType.Arrow, index: arrow.items[0][0] },
          {
            type: LocationType.Road,
            id: t,
            x: allArrows.search().location(LocationType.Road).filter(item => item.location.id[0] === t[0] && item.location.id[1] === t[1]).count()
          },
          node === t[1] ? { rotation: { z: 1 } } : undefined
        ))
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

        expeditions[item.id!] = move.rotation?.z ? move.location.id[0] : move.location.id[1]
        if (expeditionArrows.some((arrow) => arrow.location.id!.some((place: number) => expeditions[item.id!] === place))) {
          delete expeditions[item.id!]
        }
      }
      return []
    }

    return super.play(move)
  }

  onMovePlayed(move: MaterialRulesMove<Color, MaterialType, LocationType>): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    if (move.kind === MoveKind.MaterialMove && move.itemsType === MaterialType.Arrow && move.type === MaterialMoveType.Move) {
      return [this.rulesMoves().nextStep(PlayerTurn, this.nextPlayer(), this.getData<MainGameData>())]
    }

    return []
  }
}

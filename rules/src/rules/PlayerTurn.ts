import { MaterialMoveType, MaterialRulesMove, MoveKind, PlayerRulesStep } from '@gamepark/rules-api'
import Color from '../Color'
import { MaterialType } from '../material/ExpeditionMaterial'
import { LocationType } from '../material/ExpeditionLocations'
import { getNextArrowOrigin, isSameRoad, roads } from '../material/Road'
import { ArrowColor, arrowColors } from '../material/ArrowColor'
import { RulesStep } from './RulesStep'

export class PlayerTurn extends PlayerRulesStep<Color, MaterialType, LocationType> {
  getPlayerMoves() {
    return this.getArrowsMoves()
  }

  getArrowsMoves(): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    return arrowColors.flatMap(color => this.getArrowMoves(color))
  }

  getArrowMoves(color: ArrowColor): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    const arrows = this.material(MaterialType.Arrow)
    const stockArrows = arrows.location(LocationType.ArrowsStock).id(color)
    if (!stockArrows.length) return []
    const expeditionArrows = arrows.id(color).location(LocationType.Road).getItems()
    return getNextArrowOrigin(expeditionArrows).flatMap(node =>
      roads.filter(road =>
        (road[0] === node || road[1] === node) && !expeditionArrows.some(arrow => isSameRoad(road, arrow.location.id))
      ).map(road => {
          const x = arrows.location(LocationType.Road).locationId(road).length
          return stockArrows.moveItem(LocationType.Road, { id: road, x }, road[1] === node && { z: 1 })
        }
      )
    )
  }

  onMovePlayed(move: MaterialRulesMove<Color, MaterialType, LocationType>): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    if (move.kind === MoveKind.MaterialMove && move.itemsType === MaterialType.Arrow && move.type === MaterialMoveType.Move) {
      return [this.rulesMoves().nextStep(RulesStep.PlayerTurn, this.nextPlayer)]
    }

    return []
  }
}

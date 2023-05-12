import { createMoveItemMove, MaterialItem, MaterialMoveType, MaterialRulesMove, MoveKind, PlayerRulesStep } from '@gamepark/rules-api'
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
    const arrowMaterial = this.material(MaterialType.Arrow)
    const stockItemIndex = arrowMaterial.items.findIndex(arrow =>
      arrow.id === color && arrow.location.type === LocationType.ArrowsStock && arrow.quantity
    )
    if (stockItemIndex === -1) return []
    const arrowsOnBoard = arrowMaterial.items.filter(arrow => arrow.id === color && arrow.location.type === LocationType.Road)
    return getNextArrowOrigin(arrowsOnBoard).flatMap(node =>
      roads.filter(road =>
        (road[0] === node || road[1] === node) && !arrowsOnBoard.some(arrow => isSameRoad(road, arrow.location.id))
      ).map(road => {
          const x = arrowMaterial.search().location(LocationType.Road).filter(item => isSameRoad(road, item.location.id)).count()
          const item: MaterialItem = { location: { type: LocationType.Road, id: road, x } }
          if (road[1] === node) item.rotation = { z: 1 }
          return createMoveItemMove(MaterialType.Arrow, stockItemIndex, item)
        }
      )
    )
  }

  onMovePlayed(move: MaterialRulesMove<Color, MaterialType, LocationType>): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    if (move.kind === MoveKind.MaterialMove && move.itemsType === MaterialType.Arrow && move.type === MaterialMoveType.Move) {
      return [this.rulesMoves().nextStep(RulesStep.PlayerTurn, this.nextPlayer())]
    }

    return []
  }
}

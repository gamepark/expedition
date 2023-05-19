import { MaterialRulesMove, PlayerRulesStep } from '@gamepark/rules-api'
import { MaterialType } from '../material/ExpeditionMaterial'
import { LocationType } from '../material/LocationType'
import Color from '../Color'
import { Expedition } from './Expedition'
import { arrowColors } from '../material/ArrowColor'
import { PlayerTurnData } from './PlayerTurn'
import equal from 'fast-deep-equal'

export type TicketEffectData = PlayerTurnData & {
  arrowRemoved?: boolean
}

export class TicketEffect extends PlayerRulesStep<Color, MaterialType, LocationType> {
  getPlayerMoves() {
    const moves: MaterialRulesMove<Color, MaterialType, LocationType>[] = []
    const arrowsOnBoard = this.material(MaterialType.Arrow).location(LocationType.Road)
    for (const arrowColor of arrowColors) {
      const lastArrow = new Expedition(arrowColor, arrowsOnBoard).lastArrow
      if (!lastArrow) continue
      moves.push(
        arrowsOnBoard
          .id(lastArrow.id)
          .location((location) => equal(location, lastArrow.location))
          .moveItem(LocationType.ArrowsStock)
      )
    }

    return moves
  }
}

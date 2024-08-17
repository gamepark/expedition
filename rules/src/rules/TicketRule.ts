import { isMoveItem, ItemMove, ItemMoveType, MaterialMove } from '@gamepark/rules-api'
import Color from '../Color'
import { arrowColors } from '../material/ArrowColor'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { arrowRoad } from '../material/Road'
import { Expedition } from './Expedition'
import { PlayerTurn } from './PlayerTurn'
import { RuleId } from './RuleId'

export class TicketRule extends PlayerTurn {
  isFreeArrow = true

  getPlayerMoves() {
    const moves: MaterialMove<Color, MaterialType, LocationType>[] = this.placeArrowMoves

    const arrows = this.material(MaterialType.Arrow)
    for (const arrowColor of arrowColors) {
      const lastArrow = new Expedition(arrowColor, arrows).lastArrow
      if (lastArrow.length) {
        moves.push(lastArrow.moveItem({ type: LocationType.ArrowsStock, id: arrowColor }))
      }
    }

    if (this.deckHasCard) {
      moves.push(this.material(MaterialType.Card).location(LocationType.Deck).deck().dealOne({ type: LocationType.Hand, player: this.player }))
    }

    return moves
  }

  beforeItemMove(move: ItemMove<Color, MaterialType, LocationType>) {
    super.beforeItemMove(move)
    if (move.type === ItemMoveType.Move && move.itemType === MaterialType.Arrow && move.location.type === LocationType.ArrowsStock) {
      const arrow = this.material(MaterialType.Arrow).getItem(move.itemIndex)!
      return super.onReachNode(arrowRoad(arrow.location)[0])
    }
    return []
  }

  getRuleAfterArrowMove(): RuleId | undefined {
    return super.getRuleAfterArrowMove() ?? RuleId.PlayerTurn
  }

  afterItemMove(move: ItemMove) {
    super.afterItemMove(move)
    if (isMoveItem(move) && move.itemType === MaterialType.Card && move.location.type === LocationType.Hand) {
      return [this.rules().startRule(RuleId.ChooseCardRule)]
    }
    return []
  }
}

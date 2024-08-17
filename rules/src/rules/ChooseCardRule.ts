import { isMoveItem, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

/**
 * After drawing 2 cards, choose and discard one of them
 */
export class ChooseCardRule extends PlayerTurnRule {
  onRuleStart() {
    const deck = this.material(MaterialType.Card).location(LocationType.Deck).deck()
    if (deck.length > 0) {
      return [deck.dealOne({ type: LocationType.Hand, player: this.player })]
    } else {
      return [this.startRule(RuleId.DiscardRule)]
    }
  }

  getPlayerMoves() {
    return this.material(MaterialType.Card).location(LocationType.Hand).player(this.player).sort(item => -item.location.x!).limit(2)
      .moveItems({ type: LocationType.Deck, x: 0 })
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.Card && move.location.type === LocationType.Deck) {
      return [this.startRule(RuleId.DiscardRule)]
    }
    return []
  }
}

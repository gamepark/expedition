import { ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import Color from '../Color'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

/**
 * After drawing 2 cards, choose and discard one of them
 */
export class ChooseCardRule extends PlayerTurnRule<Color, MaterialType, LocationType> {
  getPlayerMoves() {
    return this.material(MaterialType.Card).location(LocationType.Hand).player(this.player).sort(item => -item.location.x!).limit(2)
      .moveItems({ type: LocationType.Deck, x: 0 })
  }

  afterItemMove(move: ItemMove<Color, MaterialType, LocationType>) {
    if (move.itemType === MaterialType.Card) {
      return [this.startRule(RuleId.DiscardRule)]
    }
    return []
  }
}

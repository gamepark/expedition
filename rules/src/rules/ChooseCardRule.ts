import { ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/ExpeditionMaterial'
import { LocationType } from '../material/LocationType'
import Color from '../Color'
import { RuleId } from './RuleId'

/**
 * After drawing 2 cards, choose and discard one of them
 */
export class ChooseCardRule extends PlayerTurnRule<Color, MaterialType, LocationType> {
  getPlayerMoves() {
    return this.material(MaterialType.Card).location(LocationType.Hand).player(this.player).sort(item => -item.location.x!).limit(2)
      .moveItems({ location: { type: LocationType.Deck, x: 0 } })
  }

  afterItemMove(move: ItemMove<Color, MaterialType, LocationType>) {
    if (move.itemType === MaterialType.Card) {
      return [this.rules().startRule(RuleId.DiscardRule)]
    }
    return []
  }
}

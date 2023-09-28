import Color from './Color'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { CompetitiveScore, hideItemId, hideItemIdToOthers, MaterialGame, MaterialMove, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { RuleId } from './rules/RuleId'
import { SetupKeyPlaces } from './rules/SetupKeyPlaces'
import { PlayerTurn } from './rules/PlayerTurn'
import { TicketRule } from './rules/TicketRule'
import { LoopRule } from './rules/LoopRule'
import { ChooseCardRule } from './rules/ChooseCardRule'
import { DiscardRule } from './rules/DiscardRule'
import { locationsStrategies } from './material/LocationStrategies'

export class ExpeditionRules extends SecretMaterialRules<Color, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<Color, MaterialType, LocationType>, MaterialMove<Color, MaterialType, LocationType>, Color>,
    TimeLimit<MaterialGame<Color, MaterialType, LocationType>, MaterialMove<Color, MaterialType, LocationType>, Color> {

  rules = rules
  locationsStrategies = locationsStrategies
  hidingStrategies = hidingStrategies

  giveTime(): number {
    return 40
  }

  getScore(player: Color) {
    return this.getCardsDone(player) + this.getTokensOnCards(player) - this.getCardsInHand(player) - this.getTokensOnBoard(player)
  }

  getTieBreaker(tieBreaker: number, player: Color) {
    if (tieBreaker === 1) {
      return this.material(MaterialType.Ticket).player(player).getItem()?.quantity ?? 0
    }
    return
  }

  getCardsDone(player: Color) {
    const cards = this.material(MaterialType.Card).player(player)
    return cards.location(LocationType.PlayerArea).length
  }

  getCardsInHand(player: Color) {
    const cards = this.material(MaterialType.Card).player(player)
    return cards.location(LocationType.Hand).length
  }

  getTokensOnBoard(player: Color) {
    const tokens = this.material(MaterialType.Token).id(player)
    return tokens.location(LocationType.Place).length
  }

  getTokensOnCards(player: Color) {
    const tokens = this.material(MaterialType.Token).id(player)
    return tokens.location(LocationType.Card).length
  }
}

const rules = {
  [RuleId.SetupKeyPlaces]: SetupKeyPlaces,
  [RuleId.PlayerTurn]: PlayerTurn,
  [RuleId.TicketRule]: TicketRule,
  [RuleId.LoopRule]: LoopRule,
  [RuleId.ChooseCardRule]: ChooseCardRule,
  [RuleId.DiscardRule]: DiscardRule
}

const hidingStrategies = {
  [MaterialType.Card]: {
    [LocationType.Deck]: hideItemId,
    [LocationType.Hand]: hideItemIdToOthers
  }
}

import Color from './Color'
import { MaterialType } from './material/ExpeditionMaterial'
import { LocationType } from './material/LocationType'
import { Competitive, hideItemId, hideItemIdToOthers, MaterialGame, MaterialMove, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { RuleId } from './rules/RuleId'
import { SetupKeyPlaces } from './rules/SetupKeyPlaces'
import { PlayerTurn } from './rules/PlayerTurn'
import { TicketRule } from './rules/TicketRule'
import { LoopRule } from './rules/LoopRule'
import { ChooseCardRule } from './rules/ChooseCardRule'
import { DiscardRule } from './rules/DiscardRule'
import { locationsStrategies } from './material/LocationStrategies'

export class ExpeditionRules extends SecretMaterialRules<Color, MaterialType, LocationType>
  implements Competitive<MaterialGame<Color, MaterialType, LocationType>, MaterialMove<Color, MaterialType, LocationType>, Color>,
    TimeLimit<MaterialGame<Color, MaterialType, LocationType>, MaterialMove<Color, MaterialType, LocationType>, Color> {

  rules = rules
  locationsStrategies = locationsStrategies
  hidingStrategies = hidingStrategies

  get isLastTurn() {
    return this.getMemory<{ lastTurn?: boolean }>().lastTurn
  }

  giveTime(): number {
    return 30
  }

  rankPlayers(playerA: Color, playerB: Color): number {
    const scoreA = this.getScore(playerA)
    const scoreB = this.getScore(playerB)
    if (scoreA !== scoreB) return scoreB - scoreA
    const ticketsA = this.material(MaterialType.Ticket).player(playerA).getItem()?.quantity ?? 0
    const ticketsB = this.material(MaterialType.Ticket).player(playerB).getItem()?.quantity ?? 0
    return ticketsB - ticketsA
  }

  getScore(player: Color): number {
    return this.getCardsDone(player) + this.getTokensOnCards(player) - this.getCardsInHand(player) - this.getTokensOnBoard(player)
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

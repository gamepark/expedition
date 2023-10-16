import {
  CompetitiveScore,
  FillGapStrategy,
  hideItemId,
  hideItemIdToOthers,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import Color from './Color'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { ChooseCardRule } from './rules/ChooseCardRule'
import { DiscardRule } from './rules/DiscardRule'
import { LoopRule } from './rules/LoopRule'
import { PlayerTurn } from './rules/PlayerTurn'
import { RuleId } from './rules/RuleId'
import { SetupKeyPlaces } from './rules/SetupKeyPlaces'
import { TicketRule } from './rules/TicketRule'

export class ExpeditionRules extends SecretMaterialRules<Color, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<Color, MaterialType, LocationType>, MaterialMove<Color, MaterialType, LocationType>, Color>,
    TimeLimit<MaterialGame<Color, MaterialType, LocationType>, MaterialMove<Color, MaterialType, LocationType>, Color> {

  rules = {
    [RuleId.SetupKeyPlaces]: SetupKeyPlaces,
    [RuleId.PlayerTurn]: PlayerTurn,
    [RuleId.TicketRule]: TicketRule,
    [RuleId.LoopRule]: LoopRule,
    [RuleId.ChooseCardRule]: ChooseCardRule,
    [RuleId.DiscardRule]: DiscardRule
  }

  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: new PositiveSequenceStrategy(),
      [LocationType.Hand]: new PositiveSequenceStrategy(),
      [LocationType.PlayerArea]: new PositiveSequenceStrategy(),
      [LocationType.CommonObjectives]: new FillGapStrategy()
    },
    [MaterialType.Arrow]: {
      [LocationType.Road]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: hideItemId,
      [LocationType.Hand]: hideItemIdToOthers
    }
  }

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






import { RuleId } from './RuleId'
import { SetupKeyPlaces } from './SetupKeyPlaces'
import { PlayerTurn } from './PlayerTurn'
import { TicketRule } from './TicketRule'
import { LoopRule } from './LoopRule'
import { ChooseCardRule } from './ChooseCardRule'
import { DiscardRule } from './DiscardRule'

export const rules = {
  [RuleId.SetupKeyPlaces]: SetupKeyPlaces,
  [RuleId.PlayerTurn]: PlayerTurn,
  [RuleId.TicketRule]: TicketRule,
  [RuleId.LoopRule]: LoopRule,
  [RuleId.ChooseCardRule]: ChooseCardRule,
  [RuleId.DiscardRule]: DiscardRule
}
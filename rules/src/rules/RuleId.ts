import Color from '../Color'
import { MaterialType } from '../material/ExpeditionMaterial'
import { LocationType } from '../material/LocationType'
import { MaterialRulesStepCreator } from '@gamepark/rules-api'
import { SetupKeyPlaces } from './SetupKeyPlaces'
import { PlayerTurn } from './PlayerTurn'
import { TicketRule } from './TicketRule'
import { LoopRule } from './LoopRule'
import { ChooseCardRule } from './ChooseCardRule'
import { DiscardRule } from './DiscardRule'

export enum RuleId {
  SetupKeyPlaces = 1,
  PlayerTurn,
  LoopRule,
  TicketRule,
  ChooseCardRule,
  DiscardRule
}

export const rulesSteps: Record<RuleId, MaterialRulesStepCreator<Color, MaterialType, LocationType>> = {
  [RuleId.SetupKeyPlaces]: SetupKeyPlaces,
  [RuleId.PlayerTurn]: PlayerTurn,
  [RuleId.TicketRule]: TicketRule,
  [RuleId.LoopRule]: LoopRule,
  [RuleId.ChooseCardRule]: ChooseCardRule,
  [RuleId.DiscardRule]: DiscardRule
}

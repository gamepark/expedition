import Color from '../Color'
import { MaterialType } from '../material/ExpeditionMaterial'
import { LocationType } from '../material/LocationType'
import { MaterialRulesStepCreator } from '@gamepark/rules-api'
import { SetupKeyPlaces } from './SetupKeyPlaces'
import { PlayerTurn } from './PlayerTurn'
import { TicketEffect } from './TicketEffect'

export enum RuleId {
  SetupKeyPlaces = 1,
  PlayerTurn,
  TicketEffect,
}

export const rulesSteps: Record<RuleId, MaterialRulesStepCreator<Color, MaterialType, LocationType>> = {
  [RuleId.SetupKeyPlaces]: SetupKeyPlaces,
  [RuleId.PlayerTurn]: PlayerTurn,
  [RuleId.TicketEffect]: TicketEffect
}

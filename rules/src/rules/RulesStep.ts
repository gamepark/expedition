import Color from '../Color'
import { MaterialType } from '../material/ExpeditionMaterial'
import { LocationType } from '../material/LocationType'
import { MaterialRulesStepCreator } from '@gamepark/rules-api'
import { SetupKeyPlaces } from './SetupKeyPlaces'
import { PlayerTurn } from './PlayerTurn'
import { TicketEffect } from './TicketEffect'

export enum RulesStep {
  SetupKeyPlaces = 1,
  PlayerTurn,
  TicketEffect,
}

export const rulesSteps: Record<RulesStep, MaterialRulesStepCreator<Color, MaterialType, LocationType>> = {
  [RulesStep.SetupKeyPlaces]: SetupKeyPlaces,
  [RulesStep.PlayerTurn]: PlayerTurn,
  [RulesStep.TicketEffect]: TicketEffect
}

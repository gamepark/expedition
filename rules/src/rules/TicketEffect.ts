import {PlayerRulesStep} from '@gamepark/rules-api'
import Color from '../Color'
import {MaterialType} from '../material/ExpeditionMaterial'

export class TicketEffect extends PlayerRulesStep<Color, MaterialType> {
  getPlayerMoves() {
    return []
  }
}

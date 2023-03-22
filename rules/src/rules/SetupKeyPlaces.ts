import {PlayerRulesStep} from '../../../../workshop/packages/rules-api'
import Color from '../Color'
import {MaterialType} from '../material/ExpeditionMaterial'

export class SetupKeyPlaces extends PlayerRulesStep<Color, MaterialType> {
  getPlayerMoves() {
    return []
  }
}
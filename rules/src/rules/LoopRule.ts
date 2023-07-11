import { MaterialType } from '../material/ExpeditionMaterial'
import { Expedition } from './Expedition'
import { PlayerTurn, PlayerTurnMemory } from './PlayerTurn'
import { MoveItem } from '@gamepark/rules-api'
import Color from '../Color'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'

export class LoopRule extends PlayerTurn {
  isFreeArrow = true

  getPlayerMoves() {
    const { expeditionColor } = this.getMemory<PlayerTurnMemory>()
    return [
      this.passMove,
      ...new Expedition(expeditionColor!, this.material(MaterialType.Arrow)).getLegalMoves()
    ]
  }

  afterArrowMove(move: MoveItem<Color, MaterialType, LocationType>) {
    return [
      ...super.afterArrowMove(move),
      this.rules().startRule(RuleId.PlayerTurn)
    ]
  }
}

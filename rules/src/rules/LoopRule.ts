import { MaterialType } from '../material/MaterialType'
import { Expedition } from './Expedition'
import { PlayerTurn } from './PlayerTurn'
import { RuleId } from './RuleId'
import { Memory } from './Memory'

export class LoopRule extends PlayerTurn {
  isFreeArrow = true

  getPlayerMoves() {
    return [
      this.passMove,
      ...new Expedition(this.remind(Memory.LastArrowMoved), this.material(MaterialType.Arrow)).getLegalMoves()
    ]
  }

  getRuleAfterArrowMove(): RuleId | undefined {
    return this.loopCreated() ? undefined : RuleId.PlayerTurn
  }
}

import { MaterialType } from '../material/ExpeditionMaterial'
import { Expedition } from './Expedition'
import { PlayerTurn, PlayerTurnMemory } from './PlayerTurn'
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

  getRuleAfterArrowMove(): RuleId | undefined {
    return this.loopCreated() ? undefined : RuleId.PlayerTurn
  }
}

import { MaterialType } from '../material/ExpeditionMaterial'
import { Expedition } from './Expedition'
import { ArrowColor } from '../material/ArrowColor'
import { PlayerTurn, PlayerTurnMemory } from './PlayerTurn'
import { MaterialRulesMove, MoveItem } from '../../../../workshop/packages/rules-api'
import Color from '../Color'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'

export type LoopRuleMemory = PlayerTurnMemory & {
  loopColor: ArrowColor
}

export class LoopRule extends PlayerTurn {
  isFreeArrow = true

  getPlayerMoves() {
    const { loopColor } = this.getMemory<LoopRuleMemory>()
    return [
      this.passMove,
      ...new Expedition(loopColor, this.material(MaterialType.Arrow)).getLegalMoves(false)
    ]
  }

  afterArrowMove(move: MoveItem<Color, MaterialType, LocationType>): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    return [
      ...super.afterArrowMove(move),
      this.rules().startRule(RuleId.PlayerTurn)
    ]
  }
}

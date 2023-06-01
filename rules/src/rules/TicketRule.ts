import { CustomMove, MaterialMove, MaterialMoveType, MaterialRulesMove, MoveItem, MoveKind, RuleMoveType } from '@gamepark/rules-api'
import { MaterialType } from '../material/ExpeditionMaterial'
import { LocationType } from '../material/LocationType'
import Color from '../Color'
import { Expedition } from './Expedition'
import { arrowColors } from '../material/ArrowColor'
import { CustomMoveType } from './CustomMoveType'
import { PlayerTurn } from './PlayerTurn'
import { RuleId } from './RuleId'
import { arrowRoad } from '../material/Road'

export class TicketRule extends PlayerTurn {
  isFreeArrow = true

  getPlayerMoves() {
    const moves: MaterialRulesMove<Color, MaterialType, LocationType>[] = this.placeArrowMoves

    const arrows = this.material(MaterialType.Arrow)
    for (const arrowColor of arrowColors) {
      const lastArrow = new Expedition(arrowColor, arrows).lastArrow
      if (lastArrow.length) {
        moves.push(lastArrow.moveItem(LocationType.ArrowsStock))
      }
    }

    if (this.deckHasCard) {
      moves.push(this.rules().customMove(CustomMoveType.ExchangeCard))
    }

    return moves
  }

  beforeMaterialMove(move: MaterialMove<Color, MaterialType, LocationType>): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    if (move.type === MaterialMoveType.Move && move.itemType === MaterialType.Arrow && move.item.location?.type === LocationType.ArrowsStock) {
      const arrow = this.material(MaterialType.Arrow).getItem(move.itemIndex)!
      return super.onReachNode(arrow.id, arrowRoad(arrow)[0])
    }
    return []
  }

  afterArrowMove(move: MoveItem<Color, MaterialType, LocationType>): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    const consequences = super.afterArrowMove(move)
    if (!consequences.some(move => move.kind === MoveKind.RulesMove && move.type === RuleMoveType.StartRule)) {
      consequences.push(this.rules().startRule(RuleId.PlayerTurn))
    }
    return consequences
  }

  onCustomMove(move: CustomMove): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    if (move.type === CustomMoveType.ExchangeCard) {
      const cards = this.material(MaterialType.Card).location(LocationType.Deck).sort((item) => -item.location.x!).limit(2)
      return [
        ...cards.moveItems(LocationType.Hand, { player: this.player }),
        this.rules().startRule(cards.length === 2 ? RuleId.ChooseCardRule : RuleId.DiscardRule)
      ]
    }

    return []
  }
}

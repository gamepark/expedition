import { CustomMove, ItemMove, ItemMoveType, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
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
    const moves: MaterialMove<Color, MaterialType, LocationType>[] = this.placeArrowMoves

    const arrows = this.material(MaterialType.Arrow)
    for (const arrowColor of arrowColors) {
      const lastArrow = new Expedition(arrowColor, arrows).lastArrow
      if (lastArrow.length) {
        moves.push(lastArrow.moveItem({ location: { type: LocationType.ArrowsStock, id: arrowColor } }))
      }
    }

    if (this.deckHasCard) {
      moves.push(this.rules().customMove(CustomMoveType.ExchangeCard))
    }

    return moves
  }

  beforeItemMove(move: ItemMove<Color, MaterialType, LocationType>) {
    super.beforeItemMove(move)
    if (move.type === ItemMoveType.Move && move.itemType === MaterialType.Arrow && move.position.location?.type === LocationType.ArrowsStock) {
      const arrow = this.material(MaterialType.Arrow).getItem(move.itemIndex)!
      return super.onReachNode(arrowRoad(arrow)[0])
    }
    return []
  }

  getRuleAfterArrowMove(): RuleId | undefined {
    return super.getRuleAfterArrowMove() ?? RuleId.PlayerTurn
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.ExchangeCard) {
      const cards = this.material(MaterialType.Card).location(LocationType.Deck).sort((item) => -item.location.x!).limit(2)
      return [
        ...cards.moveItems({ location: { type: LocationType.Hand, player: this.player } }),
        this.rules().startRule(cards.length === 2 ? RuleId.ChooseCardRule : RuleId.DiscardRule)
      ]
    }

    return []
  }
}

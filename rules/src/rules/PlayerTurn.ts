import { isMoveItemLocation, ItemMove, ItemMoveType, MaterialMove, MoveItem, PlayerTurnRule, RuleMove, RuleMoveType } from '@gamepark/rules-api'
import Color from '../Color'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { arrowColors } from '../material/ArrowColor'
import { RuleId } from './RuleId'
import { Expedition } from './Expedition'
import { arrowRoad, isBlueNode, isGreenNode, isRedNode, Node } from '../material/Road'
import { Place } from '../material/Place'
import { Memory } from './Memory'

export class PlayerTurn extends PlayerTurnRule<Color, MaterialType, LocationType> {
  isFreeArrow = false

  onRuleStart(move: RuleMove) {
    if (move.type === RuleMoveType.StartPlayerTurn) {
      this.memorize(Memory.ArrowsLeft, 1)
      this.memorize(Memory.TicketsPlayed, 0)
      this.forget(Memory.ArrowPlaced)
      this.forget(Memory.LastArrowMoved)
    }
    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    if (this.remind(Memory.ArrowPlaced)) {
      moves.push(this.passMove)
    }
    if (this.remind(Memory.ArrowsLeft) > 0) {
      moves.push(...this.placeArrowMoves)
    }
    if (this.canPlayTicket) {
      const playerTickets = this.material(MaterialType.Ticket).location(LocationType.PlayerArea).player(this.player)
      moves.push(playerTickets.deleteItem(1))
    }

    return moves
  }

  get canPlayTicket(): boolean {
    if (this.remind(Memory.TicketsPlayed) >= 2) return false
    const playerTickets = this.material(MaterialType.Ticket).location(LocationType.PlayerArea).player(this.player)
    if (!playerTickets.length) return false
    return this.arrowLeft || this.deckHasCard
      || arrowColors.some(expeditionColor => new Expedition(expeditionColor, this.material(MaterialType.Arrow)).lastArrow.length > 0)
  }

  get placeArrowMoves() {
    return arrowColors.flatMap(arrowColor => new Expedition(arrowColor, this.material(MaterialType.Arrow)).getLegalMoves())
  }

  get arrowLeft() {
    return this.material(MaterialType.Arrow).location(LocationType.ArrowsStock).length > 0
  }

  get deckHasCard() {
    return this.material(MaterialType.Card).location(LocationType.Deck).length > 0
  }

  get passMove() {
    const nextPlayer = this.nextPlayer
    if (nextPlayer !== this.game.players[0] || !this.remind(Memory.LastTurn)) {
      return this.rules().startPlayerTurn(RuleId.PlayerTurn, nextPlayer)
    } else {
      return this.rules().endGame()
    }
  }

  beforeItemMove(move: ItemMove<Color, MaterialType, LocationType>): MaterialMove[] {
    if (move.itemType === MaterialType.Arrow && move.type === ItemMoveType.Move) {
      this.memorize(Memory.LastArrowMoved, this.material(MaterialType.Arrow).getItem(move.itemIndex)?.id)
    }
    return []
  }

  afterItemMove(move: ItemMove<Color, MaterialType, LocationType>) {
    const consequences: MaterialMove[] = []
    switch (move.itemType) {
      case MaterialType.Arrow:
        if (move.type === ItemMoveType.Move) {
          consequences.push(...this.afterArrowMove(move))
        }
        break
      case MaterialType.Ticket:
        if (move.type === ItemMoveType.Delete) {
          this.memorize(Memory.TicketsPlayed, ticketsPlayed => ticketsPlayed + 1)
          consequences.push(this.rules().startRule(RuleId.TicketRule))
        }
        break
      case MaterialType.Card:
        if (move.type === ItemMoveType.Move && move.position.location?.type === LocationType.PlayerArea) {
          if (this.material(MaterialType.Card).location(LocationType.Hand).player(move.position.location.player).length === 0) {
            this.memorize(Memory.LastTurn, true)
          }
        }
    }
    return consequences
  }

  afterArrowMove(move: MoveItem<Color, MaterialType, LocationType>) {
    const consequences: MaterialMove[] = []
    if (isMoveItemLocation(move) && move.position.location.type === LocationType.Road) {
      this.memorize(Memory.ArrowPlaced, true)
      if (!this.isFreeArrow) {
        this.memorize(Memory.ArrowsLeft, arrowsLeft => arrowsLeft - 1)
      }
      const destination = arrowRoad(move.position)[1]
      consequences.push(...this.onReachNode(destination))
      if (!this.arrowLeft) {
        this.memorize(Memory.LastTurn, true)
      }
    }
    const newRule = this.getRuleAfterArrowMove()
    if (newRule !== undefined) {
      consequences.push(this.rules().startRule(newRule))
    }
    return consequences
  }

  getRuleAfterArrowMove(): RuleId | undefined {
    return this.loopCreated() ? RuleId.LoopRule : undefined
  }

  loopCreated() {
    return new Expedition(this.remind(Memory.LastArrowMoved), this.material(MaterialType.Arrow)).loop
  }

  onReachNode(node: Node) {
    const consequences: MaterialMove[] = []
    if (isGreenNode(node)) {
      consequences.push(...this.onReachPlace(node))
    } else if (isBlueNode(node)) {
      this.memorize(Memory.ArrowsLeft, arrowsLeft => arrowsLeft + 1)
    } else if (isRedNode(node)) {
      consequences.push(this.material(MaterialType.Ticket).createItem({
        location: { type: LocationType.PlayerArea, player: this.player }
      }))
    }
    return consequences
  }

  onReachPlace(place: Place) {
    const consequences: MaterialMove[] = []
    const card = this.material(MaterialType.Card).id(place)
    const cardLocation = card.getItem()?.location
    if (cardLocation?.type === LocationType.CommonObjectives || cardLocation?.type === LocationType.Hand) {
      consequences.push(card.moveItem({ location: { type: LocationType.PlayerArea, player: cardLocation.player ?? this.player } }))
      if (cardLocation.type === LocationType.Hand) {
        const token = this.material(MaterialType.Token).id(cardLocation.player).location(LocationType.Place).locationId(place)
        if (token.length) {
          consequences.push(token.moveItem({ location: { type: LocationType.Card, parent: card.getIndex() } }))
        }
      } else if (this.deckHasCard) {
        const topDeckCard = this.material(MaterialType.Card).location(LocationType.Deck).maxBy(item => item.location.x!)
        consequences.push(topDeckCard.moveItem({ location: { type: LocationType.CommonObjectives, x: cardLocation.x } }))
      }
    }
    return consequences
  }
}

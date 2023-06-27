import { isMoveItemLocation, ItemMove, ItemMoveType, MaterialMove, MoveItem, PlayerTurnRule, RuleMove, RuleMoveType, RuleStep } from '@gamepark/rules-api'
import Color from '../Color'
import { MaterialType } from '../material/ExpeditionMaterial'
import { LocationType } from '../material/LocationType'
import { ArrowColor, arrowColors } from '../material/ArrowColor'
import { RuleId } from './RuleId'
import { Expedition } from './Expedition'
import { arrowRoad, isBlueNode, isGreenNode, isRedNode, Node } from '../material/Road'
import { Place } from '../material/Place'

export type PlayerTurnMemory = {
  arrowsLeft: number
  ticketsPlayed: number
  loopsCreated: ArrowColor[]
  arrowPlaced?: boolean
}

export class PlayerTurn extends PlayerTurnRule<Color, MaterialType, LocationType> {
  isFreeArrow = false

  onRuleStart(move: RuleMove, previousRule?: RuleStep) {
    if (move.type === RuleMoveType.StartPlayerTurn) {
      this.memorize({ arrowsLeft: 1, ticketsPlayed: 0, loopsCreated: [] })
    } else if (move.type === RuleMoveType.StartRule) {
      this.memorize(previousRule?.memory)
      this.memorize(move.memory)
    }
    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const { arrowsLeft, arrowPlaced } = this.getMemory<PlayerTurnMemory>()
    if (arrowPlaced || !this.arrowLeft) {
      moves.push(this.passMove)
    }
    if (arrowsLeft > 0) {
      moves.push(...this.placeArrowMoves)
    }
    if (this.canPlayTicket) {
      const playerTickets = this.material(MaterialType.Ticket).location(LocationType.PlayerArea).player(this.player)
      moves.push(playerTickets.deleteItem(1))
    }

    return moves
  }

  get canPlayTicket(): boolean {
    const { ticketsPlayed } = this.getMemory<PlayerTurnMemory>()
    if (ticketsPlayed >= 2) return false
    const playerTickets = this.material(MaterialType.Ticket).location(LocationType.PlayerArea).player(this.player)
    if (!playerTickets.length) return false
    return this.arrowLeft || this.deckHasCard
      || arrowColors.some(expeditionColor => new Expedition(expeditionColor, this.material(MaterialType.Arrow)).lastArrow.length > 0)
  }

  get placeArrowMoves() {
    const { loopsCreated } = this.getMemory<PlayerTurnMemory>()
    return arrowColors.flatMap(arrowColor =>
      new Expedition(arrowColor, this.material(MaterialType.Arrow)).getLegalMoves(!loopsCreated.includes(arrowColor))
    )
  }

  get arrowLeft() {
    return this.material(MaterialType.Arrow).location(LocationType.ArrowsStock).length > 0
  }

  get deckHasCard() {
    return this.material(MaterialType.Card).location(LocationType.Deck).length > 0
  }

  get passMove() {
    const { lastTurn } = this.getGameMemory<{ lastTurn?: boolean }>()
    const nextPlayer = this.nextPlayer
    if (!lastTurn || nextPlayer !== this.game.players[0]) {
      return this.rules().startPlayerTurn(RuleId.PlayerTurn, nextPlayer)
    } else {
      return this.rules().endGame()
    }
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
          this.getMemory<PlayerTurnMemory>().ticketsPlayed++
          consequences.push(this.rules().startRule(RuleId.TicketRule))
        }
        break
      case MaterialType.Card:
        if (move.type === ItemMoveType.Move && move.position.location?.type === LocationType.PlayerArea) {
          if (this.material(MaterialType.Card).location(LocationType.Hand).player(move.position.location.player).length === 0) {
            this.memorizeOnGame({ lastTurn: true })
          }
        }
    }
    return consequences
  }

  afterArrowMove(move: MoveItem<Color, MaterialType, LocationType>) {
    const consequences: MaterialMove[] = []
    if (isMoveItemLocation(move) && move.position.location.type === LocationType.Road) {
      this.memorize({ arrowPlaced: true })
      if (!this.isFreeArrow) {
        this.getMemory<PlayerTurnMemory>().arrowsLeft--
      }
      const destination = arrowRoad(move.position)[1]
      consequences.push(...this.onReachNode(this.material(MaterialType.Arrow).getItem(move.itemIndex)!.id, destination))
      if (!this.arrowLeft) {
        this.memorizeOnGame({ lastTurn: true })
      }
    }
    return consequences
  }

  onReachNode(expeditionColor: ArrowColor, node: Node) {
    const consequences: MaterialMove[] = []
    if (isGreenNode(node)) {
      consequences.push(...this.onReachPlace(node))
    } else if (isBlueNode(node)) {
      this.getMemory<PlayerTurnMemory>().arrowsLeft++
    } else if (isRedNode(node)) {
      consequences.push(this.material(MaterialType.Ticket).createItem({
        location: { type: LocationType.PlayerArea, player: this.player }
      }))
    }
    const expedition = new Expedition(expeditionColor, this.material(MaterialType.Arrow))
    if (expedition.loop) {
      this.getMemory<PlayerTurnMemory>().loopsCreated.push(expeditionColor)
      consequences.push(this.rules().startRule(RuleId.LoopRule, this.player, { loopColor: expeditionColor }))
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
          consequences.push(token.moveItem({ location: { type: LocationType.Card, parent: card.index } }))
        }
      } else if (this.deckHasCard) {
        const topDeckCard = this.material(MaterialType.Card).location(LocationType.Deck).maxBy(item => item.location.x!)
        consequences.push(topDeckCard.moveItem({ location: { type: LocationType.CommonObjectives, x: cardLocation.x } }))
      }
    }
    return consequences
  }
}

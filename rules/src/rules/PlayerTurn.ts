import { isItemWithLocation, MaterialItem, MaterialMove, MaterialMoveType, MaterialRulesMove, MoveItem, PlayerTurnRule } from '@gamepark/rules-api'
import Color from '../Color'
import { MaterialType } from '../material/ExpeditionMaterial'
import { LocationType } from '../material/LocationType'
import { ArrowColor, arrowColors } from '../material/ArrowColor'
import { RuleId } from './RuleId'
import { Expedition } from './Expedition'
import { arrowRoad, isBlueNode, isGreenNode, isRedNode, Node } from '../material/Road'
import { TicketEffect, TicketEffectData } from './TicketEffect'

export type PlayerTurnData = {
  arrowsLeft: number
  ticketsPlayed: number
  loopsCreated: ArrowColor[]
  loopColor?: ArrowColor
  arrowPlaced?: boolean
  playTicket?: boolean
}

export class PlayerTurn extends PlayerTurnRule<Color, MaterialType, LocationType> {

  delegate(): PlayerTurnRule<Color, MaterialType, LocationType> | undefined {
    const { playTicket } = this.getMemory<PlayerTurnData>()
    if (playTicket) {
      return new TicketEffect(this.game)
    }

    return
  }

  getPlayerMoves() {
    const moves: MaterialRulesMove[] = []
    const {
      arrowsLeft,
      ticketsPlayed,
      loopsCreated,
      loopColor,
      arrowPlaced,
      playTicket
    } = this.getMemory<PlayerTurnData>()
    const noArrowLeft = this.material(MaterialType.Arrow).location(LocationType.ArrowsStock).length === 0
    if (arrowPlaced || noArrowLeft) {
      moves.push(this.rules().startPlayerTurn(RuleId.PlayerTurn, this.nextPlayer, {
        arrowsLeft: 1,
        ticketsPlayed: 0,
        loopsCreated: []
      }))
    }
    if (!!loopColor) {
      moves.push(...new Expedition(loopColor, this.material(MaterialType.Arrow)).getLegalMoves(false))
    } else {
      if (arrowsLeft > 0 || playTicket) {
        for (const arrowColor of arrowColors) {
          const canLoop = !loopsCreated.includes(arrowColor)
          moves.push(...new Expedition(arrowColor, this.material(MaterialType.Arrow)).getLegalMoves(canLoop))
        }
      }
      if (ticketsPlayed < 2 && !playTicket) {
        const playerTickets = this.material(MaterialType.Ticket).location(LocationType.PlayerArea).player(this.player)
        if (playerTickets.length) {
          moves.push(playerTickets.deleteItem(1))
        }
      }
    }

    const delegate = this.delegate()
    if (delegate) {
      moves.push(
        ...delegate.getPlayerMoves()
      )
    }

    return moves
  }

  beforeMaterialMove(move: MaterialMove<Color, MaterialType, LocationType>): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    if (move.itemType === MaterialType.Arrow && move.type === MaterialMoveType.Move && move.item.location?.type === LocationType.ArrowsStock) {
      const item = this.material(MaterialType.Arrow).getItem(move.itemIndex)!
      return this.onArrowPlaced(move, item)
    }

    return []
  }

  afterMaterialMove(move: MaterialMove<Color, MaterialType, LocationType>): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    const consequences: MaterialRulesMove<Color, MaterialType, LocationType>[] = []
    if (move.itemType === MaterialType.Arrow
      && move.type === MaterialMoveType.Move
      && isItemWithLocation(move.item)
      && move.item.location.type === LocationType.Road) {
      consequences.push(
        ...this.onArrowPlaced(move, move.item)
      )
    }


    if (move.itemType === MaterialType.Ticket && move.type === MaterialMoveType.Delete) {
      const { ticketsPlayed } = this.getMemory<PlayerTurnData>()
      consequences.push(this.rules().memorize({ ticketsPlayed: ticketsPlayed + 1, playTicket: true }))
    } else if (this.getMemory<TicketEffectData>().playTicket) {
      consequences.push(this.rules().memorize({ playTicket: false }))
    }

    return consequences
  }

  onArrowPlaced(move: MoveItem<Color, MaterialType, LocationType>, item: MaterialItem<Color, LocationType>): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    const consequences: MaterialRulesMove<Color, MaterialType, LocationType>[] = []
    const { arrowPlaced, loopsCreated } = this.getMemory<PlayerTurnData>()

    if (!arrowPlaced) {
      consequences.push(this.rules().memorize({ arrowPlaced: true }))
    }

    const destination = arrowRoad(item)[move.item.location!.type === LocationType.ArrowsStock ? 0 : 1]
    const arrows = this.material(MaterialType.Arrow)
    const color = arrows.getItem(move.itemIndex)!.id
    const expedition = new Expedition(color, arrows)

    consequences.push(
      ...this.onReachDestination(destination)
    )

    if (expedition.loop) {
      consequences.push(this.rules().memorize({ loopColor: color, loopsCreated: [...loopsCreated, color] }))
    } else {
      consequences.push(this.rules().memorize({ loopColor: 0 }))
    }

    return consequences
  }

  onReachDestination(node: Node) {
    const consequences: MaterialRulesMove<Color, MaterialType, LocationType>[] = []
    const { playTicket, loopColor, arrowsLeft } = this.getMemory<PlayerTurnData>()
    if (isGreenNode(node)) {
      const card = this.material(MaterialType.Card).id(node)
      const item = card.getItem()
      if (item?.location.type === LocationType.CommonObjectives || item?.location.type === LocationType.Hand) {
        consequences.push(card.moveItem(LocationType.PlayerArea, { player: item.location.player ?? this.player }))
        if (item.location.type === LocationType.Hand) {
          const token = this.material(MaterialType.Token).id(item.location.player).location(LocationType.Place).locationId(node)
          if (token.length) {
            consequences.push(token.moveItem(LocationType.Card, { parent: node }))
          }
        } else {
          const topDeckCard = this.material(MaterialType.Card).location(LocationType.Deck).maxBy(item => item.location.x!)
          if (topDeckCard.length > 0) {
            consequences.push(topDeckCard.moveItem(LocationType.CommonObjectives, { x: item.location.x }))
          }
        }
      }
    } else if (isRedNode(node)) {
      consequences.push(this.material(MaterialType.Ticket).createItem({
        quantity: 1,
        location: { type: LocationType.PlayerArea, player: this.player }
      }))
    }
    if ((playTicket || loopColor) && isBlueNode(node)) {
      consequences.push(this.rules().memorize({ arrowsLeft: arrowsLeft + 1 }))
    } else if (!playTicket && !loopColor && !isBlueNode(node)) {
      consequences.push(this.rules().memorize({ arrowsLeft: arrowsLeft - 1 }))
    }

    return consequences

  }
}

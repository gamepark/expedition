import { isItemWithLocation, MaterialMoveType, MaterialRulesMove, MoveKind, PlayerRulesStep } from '@gamepark/rules-api'
import Color from '../Color'
import { MaterialType } from '../material/ExpeditionMaterial'
import { LocationType } from '../material/LocationType'
import { ArrowColor, arrowColors } from '../material/ArrowColor'
import { RulesStep } from './RulesStep'
import { Expedition } from './Expedition'
import { arrowRoad, isBlueNode, isGreenNode, isRedNode } from '../material/Road'

export type PlayerTurnData = {
  arrowsLeft: number
  ticketsPlayed: number
  loopsCreated: ArrowColor[]
  loopColor?: ArrowColor
  arrowPlaced?: boolean
}

export class PlayerTurn extends PlayerRulesStep<Color, MaterialType, LocationType> {
  getPlayerMoves() {
    const moves: MaterialRulesMove[] = []
    const { arrowsLeft, ticketsPlayed, loopsCreated, loopColor, arrowPlaced } = this.getData<PlayerTurnData>()
    if (arrowPlaced) {
      moves.push(this.rulesMoves().nextStep(RulesStep.PlayerTurn, this.nextPlayer, { arrowsLeft: 1, ticketsPlayed: 0, loopsCreated: [] }))
    }
    if (loopColor !== undefined) {
      moves.push(...new Expedition(loopColor, this.material(MaterialType.Arrow)).getLegalMoves(false))
    } else {
      if (arrowsLeft > 0) {
        for (const arrowColor of arrowColors) {
          const canLoop = !loopsCreated.includes(arrowColor)
          moves.push(...new Expedition(arrowColor, this.material(MaterialType.Arrow)).getLegalMoves(canLoop))
        }
      }
      if (ticketsPlayed < 2) {
        const playerTickets = this.material(MaterialType.Ticket).location(LocationType.PlayerArea).player(this.player)
        if (playerTickets.length) {
          // moves.push(playerTickets.deleteItem(1))
        }
      }
    }
    return moves
  }

  onMovePlayed(move: MaterialRulesMove<Color, MaterialType, LocationType>): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    const consequences: MaterialRulesMove<Color, MaterialType, LocationType>[] = []
    if (move.kind === MoveKind.MaterialMove && move.itemType === MaterialType.Arrow && move.type === MaterialMoveType.Move && isItemWithLocation(move.item)) {
      const data = this.getData<PlayerTurnData>()
      data.arrowPlaced = true
      if (!data.loopColor) {
        data.arrowsLeft--
      }
      const destination = arrowRoad(move.item)[1]
      if (isGreenNode(destination)) {
        const card = this.material(MaterialType.Card).id(destination)
        const item = card.getItem()
        if (item?.location.type === LocationType.CommonObjectives || item?.location.type === LocationType.Hand) {
          consequences.push(card.moveItem(LocationType.PlayerArea, { player: item.location.player ?? this.player }))
        }
      } else if (isBlueNode(destination)) {
        data.arrowsLeft++
      } else if (isRedNode(destination)) {
        consequences.push(this.material(MaterialType.Ticket).createItem({ quantity: 1, location: { type: LocationType.PlayerArea, player: this.player } }))
      }
      const arrows = this.material(MaterialType.Arrow)
      const color = arrows.getItem(move.itemIndex)!.id
      const expedition = new Expedition(color, arrows)
      if (expedition.loop) {
        data.loopColor = color
        data.loopsCreated.push(color)
      } else {
        delete data.loopColor
      }
    }

    return consequences
  }
}

import {
  CustomMove,
  MaterialMove,
  MaterialMoveType,
  MaterialRulesMove,
  MoveKind,
  PlayerTurnRule
} from '@gamepark/rules-api'
import { MaterialType } from '../material/ExpeditionMaterial'
import { LocationType } from '../material/LocationType'
import Color from '../Color'
import { Expedition } from './Expedition'
import { arrowColors } from '../material/ArrowColor'
import { PlayerTurnData } from './PlayerTurn'
import equal from 'fast-deep-equal'
import { CustomMoveType } from '../moves/CustomMoveType'

export type TicketEffectData = PlayerTurnData & {
  arrowRemoved?: boolean
  drawnCards?: number[]
}

export class TicketEffect extends PlayerTurnRule<Color, MaterialType, LocationType> {
  getPlayerMoves() {
    const moves: MaterialRulesMove<Color, MaterialType, LocationType>[] = []
    const arrowsOnBoard = this.material(MaterialType.Arrow).location(LocationType.Road)
    for (const arrowColor of arrowColors) {
      const lastArrow = new Expedition(arrowColor, arrowsOnBoard).lastArrow
      if (!lastArrow) continue
      moves.push(
        arrowsOnBoard
          .id(lastArrow.id)
          .location((location) => equal(location, lastArrow.location))
          .moveItem(LocationType.ArrowsStock)
      )
    }

    const { drawnCards = [] } = this.getMemory()
    if (!drawnCards.length) {
      moves.push({
        kind: MoveKind.CustomMove,
        data: {
          type: CustomMoveType.DrawCards
        }
      })
    }


    return moves
  }

  beforeMaterialMove(move: MaterialMove<Color, MaterialType, LocationType>): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    if (move.kind === MoveKind.MaterialMove && move.itemType === MaterialType.Card && move.type === MaterialMoveType.Move) {
      const { drawnCards = [] } = this.getMemory()

      this.rules().memorize({
        drawnCards: [
          ...drawnCards,
          move.itemIndex
        ]
      })
    }

    return []
  }

  onCustomMove(move: CustomMove): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    if (move.data.type === CustomMoveType.DrawCards) {
      return [this
        .material(MaterialType.Card)
        .location(LocationType.Deck)
        .sort((item) => item.location.x!)
        .limit(-2)
        .moveItem(LocationType.Hand, { player: this.player })]
    }

    return []
  }
}

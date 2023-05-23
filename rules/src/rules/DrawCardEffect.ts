import { MaterialRulesMove, MoveKind, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/ExpeditionMaterial'
import { LocationType } from '../material/LocationType'
import Color from '../Color'
import { PlayerTurnData } from './PlayerTurn'
import { CustomMoveType } from '../moves/CustomMoveType'

export type DrawCardsEffectData = PlayerTurnData & {
  drawCards?: boolean
}

export class DrawCardsEffect extends PlayerTurnRule<Color, MaterialType, LocationType> {
  getPlayerMoves(): MaterialRulesMove<Color,
    MaterialType,
    LocationType>[] {
    return [{
      kind: MoveKind.CustomMove,
      data: {
        type: CustomMoveType.DrawCards
      }
    }]
  }

  beforeMaterialMove(move: MaterialRulesMove<Color, MaterialType, LocationType>): MaterialRulesMove<Color, MaterialType, LocationType>[] {

    if (move.kind === MoveKind.CustomMove && move.data.type === CustomMoveType.DrawCards) {
      this.rules().memorize({ drawCards: false })

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

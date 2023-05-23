import { MoveKind } from '@gamepark/rules-api'
import { CustomMoveType } from './CustomMoveType'


export type DrawCardsMove = {
  kind: typeof MoveKind.CustomMove
  data: {
    type: CustomMoveType.DrawCards
  }
}

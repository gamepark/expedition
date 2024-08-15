/** @jsxImportSource @emotion/react */
import Color from '@gamepark/expedition/Color'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { CustomMoveType } from '@gamepark/expedition/rules/CustomMoveType'
import { DropAreaDescription } from '@gamepark/react-game'
import { isCustomMove, MaterialMove } from '@gamepark/rules-api'

export class PlayerHandDescription extends DropAreaDescription<Color, MaterialType, LocationType> {
  width = 60
  height = 11
  borderRadius = 0.5

  isMoveToLocation(move: MaterialMove): boolean {
    return isCustomMove(move) && move.type === CustomMoveType.ExchangeCard
  }
}

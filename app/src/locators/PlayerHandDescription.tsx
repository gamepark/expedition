/** @jsxImportSource @emotion/react */
import Color from '@gamepark/expedition/Color'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { DropAreaDescription } from '@gamepark/react-game'

export class PlayerHandDescription extends DropAreaDescription<Color, MaterialType, LocationType> {
  width = 60
  height = 11
  borderRadius = 0.5
}

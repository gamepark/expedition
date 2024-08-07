/** @jsxImportSource @emotion/react */
import { Locator } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { LocationType } from '@gamepark/expedition/material/LocationType'

export class BoardLocator extends Locator<Color, MaterialType, LocationType> {
  position = { x: -10, y: -5 }
}

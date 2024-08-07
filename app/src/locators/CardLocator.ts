import { Locator } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { LocationType } from '@gamepark/expedition/material/LocationType'

export class CardLocator extends Locator<Color, MaterialType, LocationType> {
  parentItemType = MaterialType.Card
  positionOnParent = { x: 80, y: 60 }
}
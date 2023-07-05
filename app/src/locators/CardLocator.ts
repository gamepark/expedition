import { ItemLocator } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'

export class CardLocator extends ItemLocator<Color, MaterialType, LocationType> {
  parentItemType = MaterialType.Card
  positionOnParent = { x: 80, y: 60 }
}
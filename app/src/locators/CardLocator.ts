import { ItemLocator } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { XYCoordinates } from '../../../../workshop/packages/rules-api'

export class CardLocator extends ItemLocator<Color, MaterialType, LocationType> {
  parentItemType = MaterialType.Card

  getPositionOnParent(): XYCoordinates {
    return { x: 80, y: 60 }
  }

  getPosition() {
    return { x: 0, y: 0, z: 1 }
  }
}
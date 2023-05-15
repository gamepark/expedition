import { DeckLocator } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { Coordinates } from '../../../../workshop/packages/rules-api'

export class CardsDeckLocator extends DeckLocator<Color, MaterialType, LocationType> {
  getCoordinates() {
    return { x: -58, y: -28.5, z: 0 }
  }

  getDelta(): Coordinates {
    return { x: -0.05, y: -0.05, z: 0.1 }
  }

  isHidden(): boolean {
    return true
  }
}
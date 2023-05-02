import { DeckLocator } from '@gamepark/react-components'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/ExpeditionLocations'
import { Coordinates } from '../../../../workshop/packages/rules-api'

export class PlaceDeckLocator extends DeckLocator<Color, MaterialType, LocationType> {
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
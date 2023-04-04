import {DeckLocator} from '@gamepark/react-components'
import Color from '@gamepark/expedition/Color'
import {MaterialType} from '@gamepark/expedition/material/ExpeditionMaterial'
import {LocationType} from '@gamepark/expedition/material/ExpeditionLocations'

export class PlaceDeckLocator extends DeckLocator<Color, MaterialType, LocationType> {
  getCoordinates() {
    return {x: -58, y: -28.5, z: 0}
  }
}
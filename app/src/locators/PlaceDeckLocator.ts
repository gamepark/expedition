import {DeckLocator} from '@gamepark/react-components'
import Color from '@gamepark/expedition/Color'
import {MaterialType} from '@gamepark/expedition/material/ExpeditionMaterial'
import {LocationType} from '@gamepark/expedition/material/ExpeditionLocations'

export class PlaceDeckLocator extends DeckLocator<Color, MaterialType, LocationType> {
  getCoordinates() {
    return {x: -30, y: 0, z: 0}
  }

  getDelta() {
    return {x: -0.05, y: -0.05, z: 0.05}
  }
}
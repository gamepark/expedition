import {LineLocator} from '@gamepark/react-components'
import Color from '@gamepark/expedition/Color'
import {MaterialType} from '@gamepark/expedition/material/ExpeditionMaterial'
import {LocationType} from '@gamepark/expedition/material/ExpeditionLocations'

export class CommonPlaceAreaLocator extends LineLocator<Color, MaterialType, LocationType> {
  getCoordinates() {
    return {x: -51, y: -28.5, z: 0}
  }

  getDelta() {
    return {x: 0, y: 9.4, z: 0}
  }
}
import {LineLocator} from '@gamepark/react-components'
import {Location} from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import {MaterialType} from '@gamepark/expedition/material/ExpeditionMaterial'
import {LocationType} from '@gamepark/expedition/material/ExpeditionLocations'

export class TokenAreaLocator extends LineLocator<Color, MaterialType, LocationType> {
  getCoordinates(location: Location<Color, LocationType>) {
    if (location.player === this.player) {
      return {x: -56, y: 30, z: 0}
    } else {
      return {x: 30, y: -30, z: 0}
    }
  }

  getDelta(location: Location<Color, LocationType>) {
    return location.player === this.player ? {x: 1.5, y: 0, z: 0} : {x: 0, y: 1.5, z: 0}
  }
}
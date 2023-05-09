import { LineLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/ExpeditionLocations'

export class TicketAreaLocator extends LineLocator<Color, MaterialType, LocationType> {
  getCoordinates(location: Location<Color, LocationType>) {
    if (location.player === this.player) {
      return { x: -53, y: 25, z: 0 }
    } else {
      return { x: 38, y: -30, z: 0 }
    }
  }

  getDelta() {
    return { x: 0, y: 1.3, z: 0 }
  }
}
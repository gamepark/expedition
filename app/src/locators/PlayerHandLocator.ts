import {HandLocator} from '@gamepark/react-components'
import {Location, MaterialItem} from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import {MaterialType} from '@gamepark/expedition/material/ExpeditionMaterial'
import {LocationType} from '@gamepark/expedition/material/ExpeditionLocations'

export class PlayerHandLocator extends HandLocator<Color, MaterialType, LocationType> {
  getCoordinates(location: Location<Color, LocationType>) {
    return location.player === this.player ? {x: -15, y: 27.5, z: 0} : {x: 45, y: -28, z: 0}
  }

  getBaseAngle(item: MaterialItem<Color, LocationType>): number {
    return item.location.player === this.player ? 0 : -90
  }

  getGapMaxAngle(item: MaterialItem<Color, LocationType>): number {
    return item.location.player === this.player ? 1.1 : 3
  }

  getMaxAngle(item: MaterialItem<Color, LocationType>): number {
    return item.location.player === this.player ? 15 : 3
  }

  getRadius(item: MaterialItem<Color, LocationType>): number {
    return item.location.player === this.player ? 300 : 100
  }
}
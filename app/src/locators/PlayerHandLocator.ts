import {HandLocator} from '@gamepark/react-components'
import {Location, MaterialItem} from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import {MaterialType} from '@gamepark/expedition/material/ExpeditionMaterial'
import {LocationType} from '@gamepark/expedition/material/ExpeditionLocations'

export class PlayerHandLocator extends HandLocator<Color, MaterialType, LocationType> {
  getCoordinates(location: Location<Color, LocationType>) {
    return location.player === this.player ? {x: 0, y: 35, z: 0} : {x: 0, y: -35, z: 0}
  }

  getBaseAngle(item: MaterialItem<Color, LocationType>): number {
    return item.location.player === this.player ? 0 : 180
  }
}
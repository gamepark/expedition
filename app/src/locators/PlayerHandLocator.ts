import { HandLocator, PlaceItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/ExpeditionLocations'

export class PlayerHandLocator extends HandLocator<Color, MaterialType, LocationType> {
  isHidden(item: MaterialItem<Color, LocationType>, context: PlaceItemContext<Color, MaterialType, LocationType>): boolean {
    return item.location.player !== context.player
  }

  getCoordinates(location: Location<Color, LocationType>) {
    return location.player === this.player ? { x: -15, y: 27.5, z: 0 } : { x: 45, y: -28, z: 0 }
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
import { LineLocator, PlaceItemContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'

export class PlayerAreaLocator extends LineLocator<Color, MaterialType, LocationType> {
  getCoordinates({ location }: MaterialItem<Color, LocationType>, { type }: PlaceItemContext<Color, MaterialType, LocationType>): Coordinates {
    switch (type) {
      case MaterialType.Token:
        return location.player === this.player ? { x: -56, y: 30, z: 0 } : { x: 30, y: -30, z: 0 }
      case MaterialType.Ticket:
        return location.player === this.player ? { x: -53, y: 25, z: 0 } : { x: 38.5, y: -30, z: 0 }
      default:
        return location.player === this.player ? { x: 24, y: 28, z: 0 } : { x: 32, y: -29.5, z: 0 }
    }
  }

  getDelta({ location }: MaterialItem<Color, LocationType>, { type }: PlaceItemContext<Color, MaterialType, LocationType>): Partial<Coordinates> {
    switch (type) {
      case MaterialType.Token:
        return location.player === this.player ? { x: 1.5 } : { y: 1.5 }
      case MaterialType.Ticket:
        return { x: 0, y: 1.3, z: 0 }
      default:
        return location.player === this.player ? { x: -3, z: 0.05 } : { y: 1, z: 0.05 }
    }
  }

  getRotation({ location }: MaterialItem<Color, LocationType>, { type }: PlaceItemContext<Color, MaterialType, LocationType>): number {
    return type === MaterialType.Card && location.player !== this.player ? -90 : 0
  }
}
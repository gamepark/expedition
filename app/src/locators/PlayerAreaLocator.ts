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
        return location.player === this.player ? { x: -53, y: 25, z: 0 } : { x: 38, y: -30, z: 0 }
      default:
        return { x: 0, y: 0, z: 0 } // TODO
    }
  }

  getDelta({ location }: MaterialItem<Color, LocationType>, { type }: PlaceItemContext<Color, MaterialType, LocationType>): Partial<Coordinates> {
    switch (type) {
      case MaterialType.Token:
        return location.player === this.player ? { x: 1.5, y: 0, z: 0 } : { x: 0, y: 1.5, z: 0 }
      case MaterialType.Ticket:
        return { x: 0, y: 1.3, z: 0 }
      default:
        return { x: 0, y: 0, z: 0 } // TODO
    }
  }
}
/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { TicketStockDescription } from './TicketStockDescription'

export class TicketStockLocator extends PileLocator<Color, MaterialType, LocationType> {
  locationDescription = new TicketStockDescription()
  rotate = true

  getCoordinates(): Coordinates {
    return { ...this.locationDescription.coordinates, z: 0 }
  }

  getLocations(): Location<Color, LocationType>[] {
    return [{
      type: LocationType.TicketStock
    }]
  }

  getRadius(): number {
    return 3
  }
}

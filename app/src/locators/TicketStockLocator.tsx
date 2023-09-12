/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { TicketStockDescription } from './TicketStockDescription'

export class TicketStockLocator extends PileLocator<Color, MaterialType, LocationType> {
  locationDescription = new TicketStockDescription()
  coordinates = { ...this.locationDescription.coordinates, z: 0 }
  radius = 3
}

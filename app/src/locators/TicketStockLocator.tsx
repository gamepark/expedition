/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { TicketStockDescription } from './TicketStockDescription'

export class TicketStockLocator extends PileLocator<Color, MaterialType, LocationType> {
  locationDescription = new TicketStockDescription()
  locations = [{ type: LocationType.TicketStock }]
  rotate = true
  coordinates = { ...this.locationDescription.coordinates, z: 0 }
  radius = 3
}

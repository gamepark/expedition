/** @jsxImportSource @emotion/react */
import { LocationDescription } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { ticketDescription } from '../material/TicketDescription'

export class TicketStockDescription extends LocationDescription<Color, MaterialType, LocationType> {
  locations = [{ type: LocationType.TicketStock }]
  width = ticketDescription.width + 6
  ratio = 1
  borderRadius = this.width / 2
  coordinates = { x: -59, y: 18, z: 20 }
}

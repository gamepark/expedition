/** @jsxImportSource @emotion/react */
import Color from '@gamepark/expedition/Color'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { LocationDescription } from '@gamepark/react-game'
import { ticketDescription } from '../material/TicketDescription'

export class TicketStockDescription extends LocationDescription<Color, MaterialType, LocationType> {
  width = ticketDescription.width + 6
  ratio = 1
  borderRadius = this.width / 2
}




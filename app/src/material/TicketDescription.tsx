/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { TokenDescription } from '@gamepark/react-game'
import ticket from '../images/ticket.jpg'
import { TicketHelp } from './TicketHelp'

class TicketDescription extends TokenDescription {
  height = 2
  width = 3.25
  image = ticket
  help = TicketHelp
  stockLocation = { type: LocationType.TicketStock }
  staticItem = { quantity: 10, location: this.stockLocation }
}

export const ticketDescription = new TicketDescription()

/** @jsxImportSource @emotion/react */
import ticket from '../images/ticket.jpg'
import { TokenDescription } from '@gamepark/react-game'
import { TicketHelp } from './TicketHelp'
import { ticketStockLocation } from '../locators/TicketStockDescription'

class TicketDescription extends TokenDescription {
  height = 2
  width = 3.25
  image = ticket
  help = TicketHelp
  staticItem = { quantity: 10, location: ticketStockLocation }
  stockLocation = ticketStockLocation
}

export const ticketDescription = new TicketDescription()

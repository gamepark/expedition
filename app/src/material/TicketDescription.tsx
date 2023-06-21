/** @jsxImportSource @emotion/react */
import ticket from '../images/ticket.jpg'
import { TokenDescription } from '@gamepark/react-game'
import { TicketRules } from './TicketRules'
import { LocationType } from '@gamepark/expedition/material/LocationType'

class TicketDescription extends TokenDescription {
  height = 2
  width = 3.25
  image = ticket

  rules = TicketRules

  items = () => [{
    quantity: 10,
    location: {
      type: LocationType.TicketStock
    }
  }]

  stock = {
    location: {
      type: LocationType.TicketStock
    }
  }
}

export const ticketDescription = new TicketDescription()

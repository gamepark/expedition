/** @jsxImportSource @emotion/react */
import ticket from '../images/ticket.jpg'
import { MaterialComponentType, TokenMaterialDescription } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { TicketRules } from './TicketRules'
import { LocationType } from '@gamepark/expedition/material/LocationType'

export const TicketDescription: TokenMaterialDescription<Color> = {
  type: MaterialComponentType.Token,
  props: {
    image: ticket,
    height: 2,
    ratio: 325 / 200
  },
  rules: TicketRules,
  items: () => [{
    quantity: 10,
    location: {
      type: LocationType.TicketStock
    }
  }],
  stock: {
    location: {
      type: LocationType.TicketStock
    }
  }
}

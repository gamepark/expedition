/** @jsxImportSource @emotion/react */
import ticket from '../images/ticket.jpg'
import { MaterialComponentType, TokenMaterialDescription } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { TicketRules } from './TicketRules'

export const TicketDescription: TokenMaterialDescription<Color> = {
  type: MaterialComponentType.Token,
  props: {
    image: ticket,
    height: 2,
    ratio: 325 / 200
  },
  rules: TicketRules
}

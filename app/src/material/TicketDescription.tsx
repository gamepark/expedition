import ticket from '../images/ticket.jpg'
import {MaterialComponentType, TokenMaterialDescription} from '@gamepark/react-components'
import Color from '@gamepark/expedition/Color'

export const TicketDescription: TokenMaterialDescription<Color> = {
  type: MaterialComponentType.Token,
  props: {
    image: ticket,
    height: 5,
    ratio: 325/200
  }
}
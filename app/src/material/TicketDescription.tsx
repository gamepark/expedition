/** @jsxImportSource @emotion/react */
import ticket from '../images/ticket.jpg'
import { MaterialComponentType, TokenMaterialDescription } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { TicketRules } from './TicketRules'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'

export class TicketDescription extends TokenMaterialDescription<Color, MaterialType, LocationType> {
  type: typeof MaterialComponentType.Token = MaterialComponentType.Token

  getProps() {

    return ({
      image: ticket,
      height: 2,
      ratio: 325 / 200
    })
  }

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

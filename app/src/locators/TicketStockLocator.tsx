/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { css, Interpolation, Theme } from '@emotion/react'
import { TicketDescription } from '../material/TicketDescription'
import { Material } from '../material/Material'

export class TicketStockLocator extends PileLocator<Color, MaterialType, LocationType> {
  rotate = true

  getCoordinates(): Coordinates {
    return { x: -59, y: 18, z: 0 }
  }

  getDelta() {
    return { x: -0.05, y: -0.05, z: 0.1 }
  }

  getLocations(): Location<Color, LocationType>[] {
    return [{
      type: LocationType.TicketStock
    }]
  }

  getLocationCss(): Interpolation<Theme> {
    const ticketProps = (Material[MaterialType.Ticket] as TicketDescription).props
    const ticketWidth = ticketProps.height * ticketProps.ratio
    return css`
      width: ${this.getRadius() * 2 + ticketWidth}em;
      height: ${this.getRadius() * 2 + ticketWidth}em;
      transform: translate3d(-50%, -50%, 20em) translate3d(${this.getCoordinates().x}em, ${this.getCoordinates().y}em, ${this.getCoordinates().z}em);
      border-radius: 5em;
    `
  }

  getRadius(): number {
    return 3
  }
}

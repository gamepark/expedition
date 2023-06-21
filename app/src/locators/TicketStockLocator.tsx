/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { css, Interpolation, Theme } from '@emotion/react'
import { ticketDescription } from '../material/TicketDescription'

export class TicketStockLocator extends PileLocator<Color, MaterialType, LocationType> {
  rotate = true

  getCoordinates(): Coordinates {
    return { x: -59, y: 18, z: 0 }
  }

  getLocations(): Location<Color, LocationType>[] {
    return [{
      type: LocationType.TicketStock
    }]
  }

  getLocationCss(): Interpolation<Theme> {
    const size = this.getRadius() * 2 + ticketDescription.width
    return css`
      width: ${size}em;
      height: ${size}em;
      transform: translate3d(-50%, -50%, 20em) translate3d(${this.getCoordinates().x}em, ${this.getCoordinates().y}em, ${this.getCoordinates().z}em);
      border-radius: ${size / 2}em;
    `
  }

  getRadius(): number {
    return 3
  }
}

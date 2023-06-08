/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { css, Interpolation, Theme } from '@emotion/react'

export class TicketStockLocator extends DeckLocator<Color, MaterialType, LocationType> {
  getCoordinates(): Coordinates {
    return { x: -59, y: 17, z: 0 }
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
    return css`
      width: 4.5em;
      height: 3em;
      left: 3.3%;
      top: 74.6%;
      transform: translate3d(-50%, -50%, 20em);
    `
  }
}

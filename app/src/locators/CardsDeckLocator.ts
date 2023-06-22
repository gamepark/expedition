/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { Location } from '../../../../workshop/packages/rules-api'
import { css, Interpolation, Theme } from '@emotion/react'
import { placeCardDescription } from '../material/PlaceCardDescription'

export class CardsDeckLocator extends DeckLocator<Color, MaterialType, LocationType> {
  getCoordinates() {
    return { x: -58, y: -28.5, z: 0 }
  }

  getDelta() {
    return { x: -0.05, y: -0.05, z: 0.1 }
  }

  isHidden(): boolean {
    return true
  }

  getLocations(): Location<Color, LocationType>[] {
    return [{
      type: LocationType.Deck
    }]
  }

  getLocationCss(): Interpolation<Theme> {
    return css`
      width: ${placeCardDescription.width + 1}em;
      height: ${placeCardDescription.width / placeCardDescription.ratio + 1}em;
      transform: translate3d(-50%, -50%, 20em) translate3d(${this.getCoordinates().x - 0.5}em, ${this.getCoordinates().y - 0.5}em, ${this.getCoordinates().z}em);
      border-radius: ${(placeCardDescription.borderRadius)}em;
    `
  }


}

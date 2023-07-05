/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { Location } from '../../../../workshop/packages/rules-api'
import { DeckLocationDescription } from './DeckLocationDescription'

export class CardsDeckLocator extends DeckLocator<Color, MaterialType, LocationType> {
  locationDescription = new DeckLocationDescription()

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
}

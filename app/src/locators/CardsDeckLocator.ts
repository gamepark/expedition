/** @jsxImportSource @emotion/react */
import Color from '@gamepark/expedition/Color'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { DeckLocator } from '@gamepark/react-game'
import { DeckLocationDescription } from './DeckLocationDescription'

export class CardsDeckLocator extends DeckLocator<Color, MaterialType, LocationType> {
  location = { type: LocationType.Deck }
  locationDescription = new DeckLocationDescription()
  coordinates = { x: -58, y: -28.5 }
}

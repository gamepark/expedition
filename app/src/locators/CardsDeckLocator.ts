/** @jsxImportSource @emotion/react */
import Color from '@gamepark/expedition/Color'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { DeckLocator, DropAreaDescription } from '@gamepark/react-game'
import { placeCardDescription } from '../material/PlaceCardDescription'

export class CardsDeckLocator extends DeckLocator<Color, MaterialType, LocationType> {
  locationDescription = new DropAreaDescription(placeCardDescription)
  coordinates = { x: -58, y: -28.5 }
}

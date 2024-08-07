/** @jsxImportSource @emotion/react */
import Color from '@gamepark/expedition/Color'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { LocationDescription } from '@gamepark/react-game'
import { placeCardDescription } from '../material/PlaceCardDescription'

export class DeckLocationDescription extends LocationDescription<Color, MaterialType, LocationType> {
  width = placeCardDescription.width + 1
  height = placeCardDescription.width / placeCardDescription.ratio + 1
  borderRadius = placeCardDescription.borderRadius
  coordinates = { x: -58.5, y: -29, z: 20 }
}

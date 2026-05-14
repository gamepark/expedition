import { DeckLocator } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { DeckLocationDescription } from './DeckLocationDescription'

export class CardsDeckLocator extends DeckLocator<Color, MaterialType, LocationType> {
  locationDescription = new DeckLocationDescription()
  coordinates = { x: -58, y: -28.5, z: 0 }
  gap = { x: -0.05, y: -0.05, z: 0.1 }
}

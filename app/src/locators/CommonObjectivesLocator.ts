import Color from '@gamepark/expedition/Color'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { ListLocator } from '@gamepark/react-game'

export class CommonObjectivesLocator extends ListLocator<Color, MaterialType, LocationType> {
  coordinates = { x: -51, y: -28.5 }
  gap = { y: 9.4 }
}
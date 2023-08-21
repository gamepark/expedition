import { LineLocator } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { LocationType } from '@gamepark/expedition/material/LocationType'

export class CommonObjectivesLocator extends LineLocator<Color, MaterialType, LocationType> {
  coordinates = { x: -51, y: -28.5, z: 0 }
  delta = { x: 0, y: 9.4, z: 0 }
}
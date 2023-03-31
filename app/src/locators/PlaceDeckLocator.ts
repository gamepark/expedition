import {DeckLocator} from '@gamepark/react-components'
import Color from '@gamepark/expedition/Color'
import {MaterialType} from '@gamepark/expedition/material/ExpeditionMaterial'
import {LocationType} from '@gamepark/expedition/material/ExpeditionLocations'

export class PlaceDeckLocator extends DeckLocator<Color, MaterialType, LocationType> {
  location = [-30, 0]
  deltaX = -0.05
  deltaY = -0.05
}
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { ArrowColor } from '@gamepark/expedition/material/ArrowColor'
import { PileLocator } from '@gamepark/react-game'
import { ArrowStockDescription } from './ArrowStockDescription'

export class ArrowsStockLocator extends PileLocator<Color, MaterialType, LocationType> {
  rotate = true
  radius = 3
  locationDescription = new ArrowStockDescription()

  getCoordinates(item: MaterialItem<Color, LocationType, ArrowColor>): Coordinates {
    return this.locationDescription.stockCoordinates[item.id!]
  }
}

import { Coordinates, Location } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { ArrowColor } from '@gamepark/expedition/material/ArrowColor'
import { PileLocator } from '@gamepark/react-game'
import { ArrowStockDescription } from './ArrowStockDescription'

export class ArrowsStockLocator extends PileLocator<Color, MaterialType, LocationType> {
  radius = 3
  locationDescription = new ArrowStockDescription()

  getCoordinates(location: Location<Color, LocationType>): Coordinates {
    return this.locationDescription.stockCoordinates[location.id as ArrowColor]
  }
}

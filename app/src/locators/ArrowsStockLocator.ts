import { ArrowColor, arrowColors } from '@gamepark/expedition/material/ArrowColor'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { PileLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { ArrowStockDescription } from './ArrowStockDescription'

export class ArrowsStockLocator extends PileLocator {
  radius = 3
  locations = arrowColors.map(arrow => ({ type: LocationType.ArrowsStock, id: arrow }))
  locationDescription = new ArrowStockDescription()

  stockCoordinates: Record<ArrowColor, Coordinates> = {
    [ArrowColor.Yellow]: { x: -59, y: -15, z: 0 },
    [ArrowColor.Blue]: { x: -59, y: -5, z: 0 },
    [ArrowColor.Red]: { x: -59, y: 5, z: 0 }
  }

  getPileCoordinates(location: Location): Coordinates {
    return this.stockCoordinates[location.id]
  }
}

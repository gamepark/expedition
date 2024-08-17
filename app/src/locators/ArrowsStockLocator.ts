import { ArrowColor } from '@gamepark/expedition/material/ArrowColor'
import { PileLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { ArrowStockDescription } from './ArrowStockDescription'

export class ArrowsStockLocator extends PileLocator {
  radius = 3
  locationDescription = new ArrowStockDescription()

  stockCoordinates: Record<ArrowColor, Coordinates> = {
    [ArrowColor.Yellow]: { x: -59, y: -15, z: 0 },
    [ArrowColor.Blue]: { x: -59, y: -5, z: 0 },
    [ArrowColor.Red]: { x: -59, y: 5, z: 0 }
  }

  getCoordinates(location: Location): Coordinates {
    return this.stockCoordinates[location.id]
  }
}

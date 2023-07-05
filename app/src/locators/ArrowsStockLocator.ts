import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { ArrowColor } from '@gamepark/expedition/material/ArrowColor'
import { PileLocator } from '@gamepark/react-game'

export class ArrowsStockLocator extends PileLocator<Color, MaterialType, LocationType> {
  rotate = true
  stockCoordinates: Record<ArrowColor, Coordinates> = {
    [ArrowColor.Yellow]: { x: -59, y: -15, z: 0 },
    [ArrowColor.Blue]: { x: -59, y: -5, z: 0 },
    [ArrowColor.Red]: { x: -59, y: 5, z: 0 }
  }
  radius = 3

  getCoordinates(item: MaterialItem<Color, LocationType, ArrowColor>): Coordinates {
    return this.stockCoordinates[item.id!]
  }
}

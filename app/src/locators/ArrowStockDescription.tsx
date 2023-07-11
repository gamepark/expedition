/** @jsxImportSource @emotion/react */
import { LocationDescription } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { ArrowColor, arrowColors } from '@gamepark/expedition/material/ArrowColor'
import { Coordinates, Location } from '@gamepark/rules-api'

export class ArrowStockDescription extends LocationDescription<Color, MaterialType, LocationType> {
  locations = arrowColors.map(arrow => ({ type: LocationType.ArrowsStock, id: arrow }))
  width = 9
  ratio = 1
  borderRadius = this.width / 2

  stockCoordinates: Record<ArrowColor, Coordinates> = {
    [ArrowColor.Yellow]: { x: -59, y: -15, z: 0 },
    [ArrowColor.Blue]: { x: -59, y: -5, z: 0 },
    [ArrowColor.Red]: { x: -59, y: 5, z: 0 }
  }

  getCoordinates(location: Location<Color, LocationType>): Coordinates {
    return this.stockCoordinates[location.id!]
  }
}

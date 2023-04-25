import {Coordinates, MaterialItem} from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import {MaterialType} from '@gamepark/expedition/material/ExpeditionMaterial'
import {LocationType} from '@gamepark/expedition/material/ExpeditionLocations'
import {ArrowColor} from '@gamepark/expedition/material/ArrowColor'
import {PileLocator} from '@gamepark/react-components'

export class ArrowsStockLocator extends PileLocator<Color, MaterialType, LocationType> {
  rotate = true

  getCoordinates(item: MaterialItem<Color, LocationType, ArrowColor>): Coordinates {
    switch (item.id!) {
      case ArrowColor.Yellow:
        return {x: -59, y: -10, z: 0}
      case ArrowColor.Blue:
        return {x: -59, y: 0, z: 0}
      case ArrowColor.Red:
        return {x: -59, y: 10, z: 0}
    }
  }

  getRadius(): number {
    return 3
  }

  getPileId(item: MaterialItem<Color, LocationType>): number {
    return item.id!
  }
}

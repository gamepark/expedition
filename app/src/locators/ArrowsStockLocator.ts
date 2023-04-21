import { ItemLocator } from '@gamepark/react-components'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/ExpeditionLocations'
import { ArrowColor } from '@gamepark/expedition/material/ArrowColor'

export class ArrowsStockLocator extends ItemLocator<Color, MaterialType, LocationType> {
  getPosition(item: MaterialItem<Color, LocationType, ArrowColor>): Coordinates {
    switch (item.id!) {
      case ArrowColor.Yellow:
        return { x: -60, y: -10, z: 0 }
      case ArrowColor.Blue:
        return { x: -60, y: 0, z: 0 }
      case ArrowColor.Red:
        return { x: -60, y: 10, z: 0 }
    }
  }
}

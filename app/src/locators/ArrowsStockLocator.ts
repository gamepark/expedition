import {ItemLocator} from '@gamepark/react-components'
import {MaterialItem} from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import {MaterialType} from '@gamepark/expedition/material/ExpeditionMaterial'
import {LocationType} from '@gamepark/expedition/material/ExpeditionLocations'
import {ArrowColor} from '@gamepark/expedition/material/ArrowColor'

export class ArrowsStockLocator extends ItemLocator<Color, MaterialType, LocationType> {
  place(item: MaterialItem<Color, LocationType, ArrowColor>): string {
    switch (item.id!) {
      case ArrowColor.Yellow:
        return 'translate(-60em, -10em)'
      case ArrowColor.Blue:
        return 'translate(-60em, 0em)'
      case ArrowColor.Red:
        return 'translate(-60em, 10em)'
    }
  }
}
import {ItemLocator} from '@gamepark/react-components'
import {MaterialItem} from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import {MaterialType} from '@gamepark/expedition/material/ExpeditionMaterial'
import {LocationType} from '@gamepark/expedition/material/ExpeditionLocations'

export class PlaceLocator extends ItemLocator<Color, MaterialType, LocationType> {
  place(_item: MaterialItem<Color, LocationType>): string {
    return 'translate(10em, -10em)'
  }
}
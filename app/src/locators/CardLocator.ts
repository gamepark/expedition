import {ItemLocator} from '@gamepark/react-components'
import {Coordinates, MaterialItem} from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import {MaterialType} from '@gamepark/expedition/material/ExpeditionMaterial'
import {LocationType} from '@gamepark/expedition/material/ExpeditionLocations'

export class CardLocator extends ItemLocator<Color, MaterialType, LocationType> {
  getPosition(_item: MaterialItem<Color, LocationType>): Coordinates {
    return {x: 0, y: 0, z: 0}
  }
}
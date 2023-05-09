import { ItemLocator } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/ExpeditionLocations'
import { Coordinates, MaterialItem } from '../../../../workshop/packages/rules-api'

export class TicketStockLocator extends ItemLocator<Color, MaterialType, LocationType> {
  getPosition(_item: MaterialItem<Color, LocationType>): Coordinates {
    return { x: 0, y: 0, z: 0 }
  }
}
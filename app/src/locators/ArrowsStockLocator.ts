import { arrowColors } from '@gamepark/expedition/material/ArrowColor'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { ItemContext, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { ArrowStockDescription } from './ArrowStockDescription'

export class ArrowsStockLocator extends PileLocator {
  radius = 3
  locations = arrowColors.map(arrow => ({ type: LocationType.ArrowsStock, id: arrow }))
  locationDescription = new ArrowStockDescription()

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x, y, z } = super.getItemCoordinates(item, context)
    const { x: stockX, y: stockY } = this.locationDescription.stockCoordinates[item.id!]
    return { x: x + stockX, y: y + stockY, z }
  }
}

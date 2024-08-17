/** @jsxImportSource @emotion/react */
import Color from '@gamepark/expedition/Color'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { PileLocator } from '@gamepark/react-game'
import { TicketStockDescription } from './TicketStockDescription'

export class TicketStockLocator extends PileLocator<Color, MaterialType, LocationType> {
  locationDescription = new TicketStockDescription()
  coordinates = { x: -59, y: 18, z: 0 }
  radius = 3
}

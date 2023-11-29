/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { arrowRoad } from '@gamepark/expedition/material/Road'
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { RoadDescription } from './RoadDescription'

export class RoadLocator extends ItemLocator {
  parentItemType = MaterialType.Board
  locationDescription = new RoadDescription()
  rotationUnit = 'rad'

  getRotateZ(item: MaterialItem): number {
    return this.locationDescription.getAngle(this.locationDescription.getRoadCoordinates(arrowRoad(item.location)))
  }

  getPositionOnParent(location: Location): XYCoordinates {
    const coordinates = this.locationDescription.getRoadCoordinates(location.id!)
    return { x: average(coordinates.map(c => c.x)), y: average(coordinates.map(c => c.y)) }
  }

  transformOwnItemLocation(item: MaterialItem, context: ItemContext) {
    const transform = super.transformOwnItemLocation(item, context)
    const index = this.getItemIndex(item, context)
    if (index === 1) {
      transform.push('translateX(0.8em)')
    } else if (index === 2) {
      transform.push('translateX(-0.8em)')
    }
    return transform
  }
}

const average = (arr: number[]) => arr.reduce((p, c) => p + c, 0) / arr.length

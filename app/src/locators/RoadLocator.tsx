/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { arrowRoad } from '@gamepark/expedition/material/Road'
import { ItemContext, Locator } from '@gamepark/react-game'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { RoadDescription } from './RoadDescription'

export class RoadLocator extends Locator {
  parentItemType = MaterialType.Board
  locationDescription = new RoadDescription()
  rotationUnit = 'rad'

  getRotateZ(location: Location): number {
    return this.locationDescription.getAngle(this.locationDescription.getRoadCoordinates(arrowRoad(location)))
  }

  getPositionOnParent(location: Location): XYCoordinates {
    const coordinates = this.locationDescription.getRoadCoordinates(location.id!)
    return { x: average(coordinates.map(c => c.x)), y: average(coordinates.map(c => c.y)) }
  }

  placeItem(item: MaterialItem, context: ItemContext) {
    const transform = super.placeItem(item, context)
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

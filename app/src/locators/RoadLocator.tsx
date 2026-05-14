import { ItemContext, Locator } from '@gamepark/react-game'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { arrowRoad } from '@gamepark/expedition/material/Road'
import { RoadDescription } from './RoadDescription'

export class RoadLocator extends Locator<Color, MaterialType, LocationType> {
  parentItemType = MaterialType.Board
  rotationUnit = 'rad'
  locationDescription = new RoadDescription()

  getRotateZ(location: Location<Color, LocationType>): number {
    return this.locationDescription.getAngle(this.locationDescription.getRoadCoordinates(arrowRoad(location)))
  }

  getPositionOnParent(location: Location<Color, LocationType>): XYCoordinates {
    const coordinates = this.locationDescription.getRoadCoordinates(location.id!)
    return { x: average(coordinates.map(c => c.x)), y: average(coordinates.map(c => c.y)) }
  }

  placeItem(item: MaterialItem<Color, LocationType>, context: ItemContext<Color, MaterialType, LocationType>) {
    const transform = super.placeItem(item, context)
    const index = this.getItemIndex(item, context)
    if ((index === 1 && !item.location.rotation) || (index === 2 && item.location.rotation)) {
      transform.push('translateX(0.8em)')
    } else if ((index === 1 && item.location.rotation) || (index === 2 && !item.location.rotation)) {
      transform.push('translateX(-0.8em)')
    }
    return transform
  }
}

const average = (arr: number[]) => arr.reduce((p, c) => p + c, 0) / arr.length

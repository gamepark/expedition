/** @jsxImportSource @emotion/react */
import { LocationDescription } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { Road } from '@gamepark/expedition/material/Road'
import { boardDescription, boardRatio } from '../material/BoardDescription'
import { nodesCoordinates } from './PlaceLocator'
import { RoadRules } from './RoadRules'

export class RoadDescription extends LocationDescription<Color, MaterialType, LocationType> {
  rules = RoadRules
  rotationUnit = 'rad'
  borderRadius = 1

  getSize(location: Location<Color, LocationType, Road>) {
    const coordinates = this.getRoadCoordinates(location.id!)
    const distance = Math.hypot((coordinates[1].x - coordinates[0].x) * boardRatio, (coordinates[1].y - coordinates[0].y))
    return { width: 2, height: (distance - 3) * boardDescription.height / 100 }
  }

  getRoadCoordinates(road: Road): [XYCoordinates, XYCoordinates] {
    const coordinates: [XYCoordinates, XYCoordinates] = [nodesCoordinates[road[0]], nodesCoordinates[road[1]]]
    // 3 red nodes are links between the left & right sides of the board
    if (coordinates[0].x > 50 && coordinates[1].x < 1) {
      coordinates[1] = { x: 99.95, y: coordinates[1].y }
    } else if (coordinates[1].x > 50 && coordinates[0].x < 1) {
      coordinates[0] = { x: 99.95, y: coordinates[0].y }
    }
    return coordinates
  }

  getRotation(location: Location<Color, LocationType, Road>) {
    return this.getAngle(this.getRoadCoordinates(location.id!))
  }

  getAngle(coordinates: [XYCoordinates, XYCoordinates]): number {
    return -Math.atan2((coordinates[0].x - coordinates[1].x) * boardRatio, coordinates[0].y - coordinates[1].y)
  }
}

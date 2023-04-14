import {ItemLocator} from '@gamepark/react-components'
import {Coordinates, Location} from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import {MaterialType} from '@gamepark/expedition/material/ExpeditionMaterial'
import {LocationType} from '@gamepark/expedition/material/ExpeditionLocations'
import {Road, roads} from '@gamepark/expedition/material/Road'
import {css} from '@emotion/react'
import {nodesCoordinates} from './PlaceLocator'
import {boardRatio} from '../material/BoardDescription'

export class RoadLocator extends ItemLocator<Color, MaterialType, LocationType> {
  parentItemType = MaterialType.Board

  getParentItemLocations(): Location<Color, LocationType, Road>[] {
    return roads.map(road => ({type: LocationType.Road, id: road}))
  }

  getRoadCoordinates(road: Road): Omit<Coordinates, 'z'>[] {
    const coordinates = road.map(node => nodesCoordinates[node])
    // 3 red nodes are links between the left & right sides of the board
    if (coordinates[0].x > 50 && coordinates[1].x < 1) {
      coordinates[1] = {x: 99.95, y: coordinates[1].y}
    }
    return coordinates
  }

  getLocationCss(location: Location<Color, LocationType, Road>) {
    const coordinates = this.getRoadCoordinates(location.id!)
    const angle = -Math.atan2((coordinates[1].x - coordinates[0].x) * boardRatio, coordinates[1].y - coordinates[0].y)
    const distance = Math.hypot((coordinates[1].x - coordinates[0].x) * boardRatio, (coordinates[1].y - coordinates[0].y))
    return locationCss(distance, angle)
  }

  getPositionOnParent(location: Location<Color, LocationType, Road>): Omit<Coordinates, 'z'> {
    const coordinates = this.getRoadCoordinates(location.id!)
    return {x: average(coordinates.map(c => c.x)), y: average(coordinates.map(c => c.y))}
  }
}

const locationCss = (distance: number, rotate: number) => css`
  height: ${distance - 3}%;
  width: 3%;
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(${rotate}rad);
`

const average = (arr: number[]) => arr.reduce((p, c) => p + c, 0) / arr.length

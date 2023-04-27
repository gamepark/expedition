import {ItemLocator, PlaceItemContext} from '@gamepark/react-components'
import {Coordinates, Location, MaterialItem, MaterialMoveType, MoveKind, XYCoordinates} from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import {MaterialType} from '@gamepark/expedition/material/ExpeditionMaterial'
import {LocationType} from '@gamepark/expedition/material/ExpeditionLocations'
import {Road, roads} from '@gamepark/expedition/material/Road'
import {css, Interpolation, Theme} from '@emotion/react'
import {nodesCoordinates} from './PlaceLocator'
import {boardRatio} from '../material/BoardDescription'
import equal from 'fast-deep-equal'

export class RoadLocator extends ItemLocator<Color, MaterialType, LocationType> {
  parentItemType = MaterialType.Board
  rotationUnit = 'rad'

  getParentItemLocations(): Location<Color, LocationType, Road>[] {
    return roads.map(road => ({type: LocationType.Road, id: road}))
  }

  getRotation(item: MaterialItem<Color, LocationType>): Partial<Coordinates> {
    return {z: this.getAngle(this.getRoadCoordinates(item.location))}
  }

  getRoadCoordinates(location: Location<Color, LocationType, Road>): [XYCoordinates, XYCoordinates] {
    const road = location.id!
    const coordinates: [XYCoordinates, XYCoordinates] = [nodesCoordinates[road[0]], nodesCoordinates[road[1]]]
    // 3 red nodes are links between the left & right sides of the board
    if (coordinates[0].x > 50 && coordinates[1].x < 1) {
      coordinates[1] = {x: 99.95, y: coordinates[1].y}
    }
    return location.orientation?.z === 180 ? [coordinates[1], coordinates[0]] : coordinates
  }

  getAngle(coordinates: [XYCoordinates, XYCoordinates]): number {
    return -Math.atan2((coordinates[0].x - coordinates[1].x) * boardRatio, coordinates[0].y - coordinates[1].y)
  }

  getLocationCss(location: Location<Color, LocationType, Road>) {
    const coordinates = this.getRoadCoordinates(location)
    const angle = this.getAngle(coordinates)
    const distance = Math.hypot((coordinates[1].x - coordinates[0].x) * boardRatio, (coordinates[1].y - coordinates[0].y))
    return locationCss(distance, angle)
  }

  getPositionOnParent(location: Location<Color, LocationType, Road>): XYCoordinates {
    const coordinates = this.getRoadCoordinates(location)
    return {x: average(coordinates.map(c => c.x)), y: average(coordinates.map(c => c.y))}
  }

  place(item: MaterialItem<Color, LocationType>, context: PlaceItemContext<Color, MaterialType, LocationType>): string {
    let place = super.place(item, context)
    const index = this.getItemIndex(item, context)
    if (index === 1) {
      place += ` translateX(0.8em)`
    } else if (index === 2) {
      place += ` translateX(-0.8em)`
    }
    return place
  }

  itemExtraCss(item: MaterialItem<Color, LocationType>, {legalMoves}: PlaceItemContext<Color, MaterialType, LocationType>): Interpolation<Theme> {
    if (legalMoves.some(move => move.kind === MoveKind.MaterialMove && move.type === MaterialMoveType.Move && move.itemsType === MaterialType.Arrow
      && equal(item.location.id, move.location.id))) {
      return css`pointer-events: none;`
    }
    return
  }
}

const locationCss = (distance: number, rotate: number) => css`
  height: ${distance - 3}%;
  width: 3%;
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(${rotate}rad);
`

const average = (arr: number[]) => arr.reduce((p, c) => p + c, 0) / arr.length

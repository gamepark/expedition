/** @jsxImportSource @emotion/react */
import { ItemLocator, LocationRulesProps, PlaceItemContext } from '@gamepark/react-game'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { arrowRoad, Road, roads } from '@gamepark/expedition/material/Road'
import { css } from '@emotion/react'
import { nodesCoordinates } from './PlaceLocator'
import { boardRatio } from '../material/BoardDescription'
import { ReactNode } from 'react'
import { RoadRules } from './RoadRules'

export class RoadLocator extends ItemLocator<Color, MaterialType, LocationType> {
  parentItemType = MaterialType.Board
  rotationUnit = 'rad'

  getLocationsOnParent(): Location<Color, LocationType, Road>[] {
    return roads.map(road => ({ type: LocationType.Road, id: road }))
  }

  getRotation(item: MaterialItem<Color, LocationType>): number {
    return this.getAngle(this.getRoadCoordinates(arrowRoad(item)))
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

  getAngle(coordinates: [XYCoordinates, XYCoordinates]): number {
    return -Math.atan2((coordinates[0].x - coordinates[1].x) * boardRatio, coordinates[0].y - coordinates[1].y)
  }

  getLocationCss(location: Location<Color, LocationType, Road>) {
    const coordinates = this.getRoadCoordinates(location.id!)
    const angle = this.getAngle(coordinates)
    const distance = Math.hypot((coordinates[1].x - coordinates[0].x) * boardRatio, (coordinates[1].y - coordinates[0].y))
    return locationCss(distance, angle)
  }

  getPositionOnParent(location: Location<Color, LocationType, Road>): XYCoordinates {
    const coordinates = this.getRoadCoordinates(location.id!)
    return { x: average(coordinates.map(c => c.x)), y: average(coordinates.map(c => c.y)) }
  }

  transformOwnItemLocation(item: MaterialItem<Color, LocationType>, context: PlaceItemContext<Color, MaterialType, LocationType>) {
    const transform = super.transformOwnItemLocation(item, context)
    const index = this.getItemIndex(item, context)
    if (index === 1) {
      transform.push('translateX(0.8em)')
    } else if (index === 2) {
      transform.push('translateX(-0.8em)')
    }
    return transform
  }

  getLocationRules(props: LocationRulesProps<Color, MaterialType, LocationType>): ReactNode {
    return <RoadRules {...props}/>
  }
}

const locationCss = (distance: number, rotate: number) => css`
  height: ${distance - 3}%;
  width: 3%;
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(${rotate}rad);
`

const average = (arr: number[]) => arr.reduce((p, c) => p + c, 0) / arr.length

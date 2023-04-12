import {ItemLocator} from '@gamepark/react-components'
import {Coordinates, Location, MaterialItem} from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import {MaterialType} from '@gamepark/expedition/material/ExpeditionMaterial'
import {LocationType} from '@gamepark/expedition/material/ExpeditionLocations'
import {places} from '@gamepark/expedition/material/Place'

export class PlaceLocator extends ItemLocator<Color, MaterialType, LocationType> {
  parentItemType = MaterialType.Board

  getPosition(_item: MaterialItem<Color, LocationType>): Coordinates {
    return {x: 0, y: 0, z: 0}
  }

  getParentItemLocations(): Location[] {
    return places.map(place => ({type: LocationType.Place, id: place}))
  }
}
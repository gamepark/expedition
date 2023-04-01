import {LocationType} from '@gamepark/expedition/material/ExpeditionLocations'
import {PlaceLocator} from './PlaceLocator'
import {ItemLocatorCreator} from '@gamepark/react-components'
import {PlayerHandLocator} from './PlayerHandLocator'
import {PlaceDeckLocator} from './PlaceDeckLocator'
import Color from '@gamepark/expedition/Color'
import {MaterialType} from '@gamepark/expedition/material/ExpeditionMaterial'

export const Locators: Record<LocationType, ItemLocatorCreator<Color, MaterialType, LocationType>> = {
  [LocationType.Place]: PlaceLocator,
  [LocationType.Road]: PlaceLocator,
  [LocationType.Hand]: PlayerHandLocator,
  [LocationType.CardsDeck]: PlaceDeckLocator,
  [LocationType.CommonPlacesArea]: PlaceLocator,
  [LocationType.TokenArea]: PlaceLocator,
  [LocationType.TicketArea]: PlaceLocator,
  [LocationType.TicketStock]: PlaceLocator,
  [LocationType.ArrowsStock]: PlaceLocator,
  [LocationType.PlayerPlacesArea]: PlaceLocator,
  [LocationType.Card]: PlaceLocator
}
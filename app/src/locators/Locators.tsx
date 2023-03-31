import {LocationType} from '@gamepark/expedition/material/ExpeditionLocations'
import {PlaceLocator} from './PlaceLocator'
import {ItemLocatorCreator} from '@gamepark/react-components'
import {HandLocator} from './HandLocator'
import {PlaceDeckLocator} from './PlaceDeckLocator'

export const Locators: Record<LocationType, ItemLocatorCreator> = {
  [LocationType.Place]: PlaceLocator,
  [LocationType.Road]: PlaceLocator,
  [LocationType.Hand]: HandLocator,
  [LocationType.CardsDeck]: PlaceDeckLocator,
  [LocationType.CommonPlacesArea]: PlaceLocator,
  [LocationType.TokenArea]: PlaceLocator,
  [LocationType.TicketArea]: PlaceLocator,
  [LocationType.TicketStock]: PlaceLocator,
  [LocationType.ArrowsStock]: PlaceLocator,
  [LocationType.PlayerPlacesArea]: PlaceLocator,
  [LocationType.Card]: PlaceLocator
}
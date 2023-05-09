import { LocationType } from '@gamepark/expedition/material/ExpeditionLocations'
import { PlaceLocator } from './PlaceLocator'
import { ItemLocatorCreator } from '@gamepark/react-game'
import { PlayerHandLocator } from './PlayerHandLocator'
import { PlaceDeckLocator } from './PlaceDeckLocator'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { TokenAreaLocator } from './TokenAreaLocator'
import { CommonPlaceAreaLocator } from './CommonPlaceAreaLocator'
import { TicketStockLocator } from './TicketStockLocator'
import { TicketAreaLocator } from './TicketAreaLocator'
import { RoadLocator } from './RoadLocator'
import { ArrowsStockLocator } from './ArrowsStockLocator'
import { PlayerPlacesAreaLocator } from './PlayerPlacesAreaLocator'
import { CardLocator } from './CardLocator'

export const Locators: Record<LocationType, ItemLocatorCreator<Color, MaterialType, LocationType>> = {
  [LocationType.Place]: PlaceLocator,
  [LocationType.Road]: RoadLocator,
  [LocationType.Hand]: PlayerHandLocator,
  [LocationType.CardsDeck]: PlaceDeckLocator,
  [LocationType.CommonPlacesArea]: CommonPlaceAreaLocator,
  [LocationType.TokenArea]: TokenAreaLocator,
  [LocationType.TicketArea]: TicketAreaLocator,
  [LocationType.TicketStock]: TicketStockLocator,
  [LocationType.ArrowsStock]: ArrowsStockLocator,
  [LocationType.PlayerPlacesArea]: PlayerPlacesAreaLocator,
  [LocationType.Card]: CardLocator
}
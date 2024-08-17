import Color from '@gamepark/expedition/Color'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { DeckLocator, DropAreaDescription, ListLocator, Locator, PileLocator } from '@gamepark/react-game'
import { placeCardDescription } from '../material/PlaceCardDescription'
import { ticketDescription } from '../material/TicketDescription'
import { ArrowsStockLocator } from './ArrowsStockLocator'
import { PlaceLocator } from './PlaceLocator'
import { PlayerAreaLocator } from './PlayerAreaLocator'
import { PlayerHandLocator } from './PlayerHandLocator'
import { RoadLocator } from './RoadLocator'

export const Locators: Record<LocationType, Locator<Color, MaterialType, LocationType>> = {
  [LocationType.Place]: new PlaceLocator(),
  [LocationType.Road]: new RoadLocator(),
  [LocationType.Hand]: new PlayerHandLocator(),
  [LocationType.Deck]: new DeckLocator({
    locationDescription: new DropAreaDescription(placeCardDescription),
    coordinates: { x: -58, y: -28.5 }
  }),
  [LocationType.CommonObjectives]: new ListLocator({ coordinates: { x: -51, y: -28.5 }, gap: { y: 9.4 } }),
  [LocationType.PlayerArea]: new PlayerAreaLocator(),
  [LocationType.ArrowsStock]: new ArrowsStockLocator(),
  [LocationType.Card]: new Locator({ parentItemType: MaterialType.Card, positionOnParent: { x: 80, y: 60 } }),
  [LocationType.Board]: new Locator({ coordinates: { x: -10, y: -5 } }),
  [LocationType.TicketStock]: new PileLocator({
    locationDescription: new DropAreaDescription({ width: ticketDescription.width + 6, ratio: 1, borderRadius: (ticketDescription.width + 6) / 2 }),
    coordinates: { x: -59, y: 18, z: 0 },
    radius: 3
  })
}

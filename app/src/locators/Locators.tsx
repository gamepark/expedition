import { LocationType } from '@gamepark/expedition/material/LocationType'
import { PlaceLocator } from './PlaceLocator'
import { ItemLocator } from '@gamepark/react-game'
import { PlayerHandLocator } from './PlayerHandLocator'
import { CardsDeckLocator } from './CardsDeckLocator'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { PlayerAreaLocator } from './PlayerAreaLocator'
import { CommonObjectivesLocator } from './CommonObjectivesLocator'
import { RoadLocator } from './RoadLocator'
import { ArrowsStockLocator } from './ArrowsStockLocator'
import { CardLocator } from './CardLocator'
import { BoardLocator } from './BoardLocator'

export const Locators: Record<LocationType, ItemLocator<Color, MaterialType, LocationType>> = {
  [LocationType.Place]: new PlaceLocator(),
  [LocationType.Road]: new RoadLocator(),
  [LocationType.Hand]: new PlayerHandLocator(),
  [LocationType.Deck]: new CardsDeckLocator(),
  [LocationType.CommonObjectives]: new CommonObjectivesLocator(),
  [LocationType.PlayerArea]: new PlayerAreaLocator(),
  [LocationType.ArrowsStock]: new ArrowsStockLocator(),
  [LocationType.Card]: new CardLocator(),
  [LocationType.Board]: new BoardLocator()
  //[LocationType.TicketStock]: new BoardLocator()
}

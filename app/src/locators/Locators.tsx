import { LocationType } from '@gamepark/expedition/material/LocationType'
import { PlaceLocator } from './PlaceLocator'
import { ItemLocatorCreator } from '@gamepark/react-game'
import { PlayerHandLocator } from './PlayerHandLocator'
import { CardsDeckLocator } from './CardsDeckLocator'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { PlayerAreaLocator } from './PlayerAreaLocator'
import { CommonObjectivesLocator } from './CommonObjectivesLocator'
import { RoadLocator } from './RoadLocator'
import { ArrowsStockLocator } from './ArrowsStockLocator'
import { CardLocator } from './CardLocator'

export const Locators: Record<LocationType, ItemLocatorCreator<Color, MaterialType, LocationType>> = {
  [LocationType.Place]: PlaceLocator,
  [LocationType.Road]: RoadLocator,
  [LocationType.Hand]: PlayerHandLocator,
  [LocationType.Deck]: CardsDeckLocator,
  [LocationType.CommonObjectives]: CommonObjectivesLocator,
  [LocationType.PlayerArea]: PlayerAreaLocator,
  [LocationType.ArrowsStock]: ArrowsStockLocator,
  [LocationType.Card]: CardLocator
}
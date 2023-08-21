import { MaterialType } from './MaterialType'
import { LocationType } from './LocationType'
import { FillGapStrategy, PositiveSequenceStrategy } from '@gamepark/rules-api'

export const locationsStrategies = {
  [MaterialType.Card]: {
    [LocationType.Deck]: new PositiveSequenceStrategy(),
    [LocationType.Hand]: new PositiveSequenceStrategy(),
    [LocationType.PlayerArea]: new PositiveSequenceStrategy(),
    [LocationType.CommonObjectives]: new FillGapStrategy()
  },
  [MaterialType.Arrow]: {
    [LocationType.Road]: new PositiveSequenceStrategy()
  }
}
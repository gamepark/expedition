import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { CardsAnimations } from './CardsAnimations'

export const animations = new MaterialGameAnimations({
  [MaterialType.Card]: new CardsAnimations()
})
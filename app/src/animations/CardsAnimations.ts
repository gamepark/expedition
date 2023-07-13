import { ItemContext, MaterialAnimations } from '@gamepark/react-game'
import { Animation } from '@gamepark/react-client'
import { keyframes } from '@emotion/react'
import { isMoveItem, ItemMove } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/expedition/material/LocationType'

export class CardsAnimations extends MaterialAnimations {
  override getKeyframesToDestination(destination: string, animation: Animation<ItemMove>, context: ItemContext) {
    if (isMoveItem(animation.move) && animation.move.position.location?.type === LocationType.Hand) {
      return keyframes`
        80% {
          transform: ${destination} translateY(-10em);
        }
        to {
          transform: ${destination};
        }
      `
    }
    return super.getKeyframesToDestination(destination, animation, context)
  }
}
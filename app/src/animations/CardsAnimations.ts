import { ItemAnimationContext, MaterialAnimations } from '@gamepark/react-game'
import { Animation } from '@gamepark/react-client'
import { keyframes } from '@emotion/react'
import { isMoveItem, ItemMove, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/expedition/material/LocationType'

export class CardsAnimations extends MaterialAnimations {
  override getAnimationKeyframes(destination: string, item: MaterialItem, animation: Animation<ItemMove>, context: ItemAnimationContext) {
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
    return super.getAnimationKeyframes(destination, item, animation, context)
  }
}
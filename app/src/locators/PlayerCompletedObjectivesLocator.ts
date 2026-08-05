import Color from '@gamepark/expedition/Color'
import { ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { placeCardDescription } from '../material/PlaceCardDescription'
import { getPlayerDisplayIndex } from './PlayerAreaLocator'
import { playerHandLocator } from './PlayerHandLocator'

/**
 * X coordinate of the first completed objective of the connected player. The list then expands to the left.
 */
const startX = 24

/**
 * Maximum width of the list of completed objectives of the connected player, when their hand is empty.
 */
const maxWidth = 71.5

/**
 * Space left between the hand of the connected player and their completed objectives.
 */
const handMargin = 1

/**
 * Width the list falls back to when the hand takes all the room: the objectives are then piled up on each other.
 * It must remain strictly positive, otherwise the framework ignores the maximum gap.
 */
const minWidth = 0.1

class PlayerCompletedObjectivesLocator extends ListLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    if (location.player === context.player) {
      return { x: startX, y: 28 }
    } else {
      const index = getPlayerDisplayIndex(location.player!, context)
      const baseLocation = index * 54.5 / (context.rules.players.length - 1)
      return { x: 32, y: baseLocation - 29 }
    }
  }

  getGap(location: Location, { player }: MaterialContext) {
    return location.player === player ? { x: -3, z: 0.01 } : { y: 1, z: 0.01 }
  }

  getMaxGap(location: Location, context: MaterialContext) {
    return location.player === context.player ? { x: -this.getAvailableWidth(location.player!, context) } : { y: 4 }
  }

  /**
   * The hand of the connected player moves to the left as cards are played, so the completed objectives, which expand to
   * the left, must be squeezed to never overlap the cards remaining in hand.
   * @param player The connected player
   * @param context Context of the game
   * @returns the width available for the list of completed objectives of the connected player
   */
  private getAvailableWidth(player: Color, context: MaterialContext) {
    const handRightSide = playerHandLocator.getRightSide(player, context)
    if (handRightSide === undefined) return maxWidth
    const { width } = placeCardDescription.getSize(undefined)
    const leftLimit = handRightSide + handMargin + width / 2
    return Math.max(minWidth, Math.min(maxWidth, startX - leftLimit))
  }

  getRotateZ(location: Location, { player }: MaterialContext) {
    return location.player !== player ? -90 : 0
  }

  getHoverTransform(item: MaterialItem, context: ItemContext) {
    const transform = ['translateZ(10em)', 'scale(2)']
    if (item.location.player === context.player) {
      transform.push('translateY(-2em)')
    } else {
      transform.push('rotateZ(90deg) translateY(2em)')
    }
    return transform
  }
}

export const playerCompletedObjectivesLocator = new PlayerCompletedObjectivesLocator()

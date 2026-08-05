import Color from '@gamepark/expedition/Color'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { HandLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { placeCardDescription } from '../material/PlaceCardDescription'
import { getPlayerDisplayIndex } from './PlayerAreaLocator'

export class PlayerHandLocator extends HandLocator {
  countItems(location: Location, context: MaterialContext) {
    return context.rules.material(MaterialType.Card).location(LocationType.Hand).player(location.player).length
  }

  getCoordinates(location: Location, context: MaterialContext) {
    if (location.player === context.player) {
      const count = this.countItems(location, context)
      return { x: -55 + count * 3, y: 28, z: 2 }
    } else {
      const index = getPlayerDisplayIndex(location.player!, context)
      const baseLocation = index * 54.5 / (context.rules.players.length - 1)
      return { x: 45, y: -27 + baseLocation, z: 2 }
    }
  }

  getBaseAngle(location: Location, { player }: MaterialContext) {
    return location.player === player ? 0 : -90
  }

  getGapMaxAngle(location: Location, { player }: MaterialContext) {
    return location.player === player ? 1.1 : 3
  }

  getMaxAngle(location: Location, { player }: MaterialContext) {
    return location.player === player ? 15 : 2.3
  }

  getRadius(location: Location, { player }: MaterialContext) {
    return location.player === player ? 300 : 100
  }

  /**
   * X coordinate of the right side of the last card of the hand of a player.
   * @param player Owner of the hand
   * @param context Context of the game
   * @returns the x coordinate, or undefined if the player has no card left in hand
   */
  getRightSide(player: Color, context: MaterialContext): number | undefined {
    const location = { type: LocationType.Hand, player }
    const count = this.countItems(location, context)
    if (!count) return undefined
    const { x = 0 } = this.getCoordinates(location, context)
    const radius = this.getRadius(location, context)
    const baseAngle = this.getBaseAngle(location, context) * Math.PI / 180
    const angle = this.getRotateZ(location, context, count - 1) * Math.PI / 180
    const { width, height } = placeCardDescription.getSize(undefined)
    const cardX = x + radius * Math.sin(angle) - radius * Math.sin(baseAngle)
    return cardX + width / 2 * Math.cos(angle) + height / 2 * Math.abs(Math.sin(angle))
  }

  getHoverTransform(item: MaterialItem, context: ItemContext) {
    const transform = super.getHoverTransform(item, context)
    if (item.location.player === context.player) {
      transform.push('translateY(-2em)')
    }
    return transform
  }
}

export const playerHandLocator = new PlayerHandLocator()

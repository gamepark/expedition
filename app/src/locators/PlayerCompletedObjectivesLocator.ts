import { ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { getPlayerDisplayIndex } from './PlayerAreaLocator'

class PlayerCompletedObjectivesLocator extends ListLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    if (location.player === context.player) {
      return { x: 24, y: 28 }
    } else {
      const index = getPlayerDisplayIndex(location.player!, context)
      const baseLocation = index * 54.5 / (context.rules.players.length - 1)
      return { x: 32, y: baseLocation - 29 }
    }
  }

  getGap(location: Location, { player }: MaterialContext) {
    return location.player === player ? { x: -3, z: 0.01 } : { y: 1, z: 0.01 }
  }

  getMaxGap(location: Location, { player }: MaterialContext) {
    return location.player === player ? { x: 71.5 } : { y: 4 }
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
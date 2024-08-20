import { HandLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { getPlayerDisplayIndex } from './PlayerAreaLocator'

export class PlayerHandLocator extends HandLocator {
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
}

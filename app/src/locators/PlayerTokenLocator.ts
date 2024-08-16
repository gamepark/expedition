import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { getPlayerDisplayIndex } from './PlayerAreaLocator'

export class PlayerTokenLocator extends ListLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const index = getPlayerDisplayIndex(location.player!, context)
    const baseLocation = index * 54.5 / (context.rules.players.length - 1)
    return { x: 30, y: baseLocation - 30 }
  }

  gap = { y: 1.5 }
}

export const playerTokenLocator = new PlayerTokenLocator()

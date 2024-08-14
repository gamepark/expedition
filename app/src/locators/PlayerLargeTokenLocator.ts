import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { getPlayerDisplayIndex } from './PlayerAreaLocator'

export class PlayerLargeTokenLocator extends Locator {
  getLocationCoordinates(location: Location, context: MaterialContext) {
    const index = getPlayerDisplayIndex(location.player!, context)
    const baseLocation = index * 54.5 / (context.rules.players.length - 1)
    return { x: 38.5, y: baseLocation - 30.5 }
  }
}

export const playerLargeTokenLocator = new PlayerLargeTokenLocator()

import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { getPlayerDisplayIndex } from './PlayerAreaLocator'

export class PlayerTicketLocator extends ListLocator {
  getOriginCoordinates(location: Location, context: MaterialContext) {
    const index = getPlayerDisplayIndex(location.player!, context)
    const baseLocation = index * 54.5 / (context.rules.players.length - 1)
    return { x: 38.5, y: baseLocation - 27.2 }
  }

  gap = { y: 1.3 }
  maxGap = { y: 5 }
}

export const playerTicketLocator = new PlayerTicketLocator()

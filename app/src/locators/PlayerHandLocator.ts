import Color from '@gamepark/expedition/Color'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { getRelativePlayerIndex, HandLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { PlayerHandDescription } from './PlayerHandDescription'

export class PlayerHandLocator extends HandLocator {
  location = { type: LocationType.Hand }
  locationDescription = new PlayerHandDescription()

  getDisplayIndex(player: Color, context: MaterialContext) {
    if (context.player === undefined) {
      return getRelativePlayerIndex(context, player)
    } else {
      const players = context.rules.players.length
      return (getRelativePlayerIndex(context, player) + players - 1) % players
    }
  }

  getCoordinates(location: Location, context: MaterialContext) {
    if (location.player === context.player) {
      const count = this.countItems(location, context)
      return { x: -55 + count * 3, y: 28, z: 10 }
    } else {
      const index = this.getDisplayIndex(location.player!, context)
      const baseLocation = index * 54.5 / (context.rules.players.length - 1)
      return { x: 45, y: -27 + baseLocation, z: 10 }
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

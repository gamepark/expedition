import { getRelativePlayerIndex, HandLocator, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { PlayerHandDescription } from './PlayerHandDescription'

export class PlayerHandLocator extends HandLocator<Color, MaterialType, LocationType> {
  location = { type: LocationType.Hand }
  locationDescription = new PlayerHandDescription()

  getDisplayIndex(player: Color, context: ItemContext<Color, MaterialType, LocationType>) {
    if (context.player === undefined) {
      return getRelativePlayerIndex(context, player)
    } else {
      const players = context.rules.players.length
      return (getRelativePlayerIndex(context, player) + players - 1) % players
    }
  }

  getCoordinates(location: Location<Color, LocationType>, context: ItemContext<Color, MaterialType, LocationType>) {
    if (location.player === context.player) {
      const count = this.countItems(location, context)
      return { x: -55 + count * 3, y: 28, z: 10 }
    } else {
      const index = this.getDisplayIndex(location.player!, context)
      const baseLocation = index * 54.5 / (context.rules.players.length - 1)
      return { x: 45, y: -27 + baseLocation, z: 10 }
    }
  }

  getBaseAngle(item: MaterialItem<Color, LocationType>, { player }: ItemContext<Color, MaterialType, LocationType>): number {
    return item.location.player === player ? 0 : -90
  }

  getGapMaxAngle(item: MaterialItem<Color, LocationType>, { player }: ItemContext<Color, MaterialType, LocationType>): number {
    return item.location.player === player ? 1.1 : 3
  }

  getMaxAngle(item: MaterialItem<Color, LocationType>, { player }: ItemContext<Color, MaterialType, LocationType>): number {
    return item.location.player === player ? 15 : 2.3
  }

  getRadius(item: MaterialItem<Color, LocationType>, { player }: ItemContext<Color, MaterialType, LocationType>): number {
    return item.location.player === player ? 300 : 100
  }
}

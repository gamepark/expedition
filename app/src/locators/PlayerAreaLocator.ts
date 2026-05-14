import { getRelativePlayerIndex, ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { LocationType } from '@gamepark/expedition/material/LocationType'

export class PlayerAreaLocator extends ListLocator<Color, MaterialType, LocationType> {
  getDisplayIndex(player: Color, context: MaterialContext<Color, MaterialType, LocationType>) {
    if (context.player === undefined) {
      return getRelativePlayerIndex(context, player)
    } else {
      const players = context.rules.players.length
      return (getRelativePlayerIndex(context, player) + players - 1) % players
    }
  }

  getCoordinates(location: Location<Color, LocationType>, context: MaterialContext<Color, MaterialType, LocationType>): Partial<Coordinates> {
    const index = this.getDisplayIndex(location.player!, context)
    const baseLocation = index * 54.5 / (context.rules.players.length - 1)
    const itemType = (context as ItemContext<Color, MaterialType, LocationType>).type
    switch (itemType) {
      case MaterialType.Token:
        return { x: 30, y: -30 + baseLocation, z: 0 }
      case MaterialType.Ticket:
        return { x: 38.5, y: -27.2 + baseLocation, z: 0 }
      case MaterialType.LargeToken:
        return { x: 38.5, y: -30.5 + baseLocation, z: 0 }
      default:
        return location.player === context.player ? { x: 24, y: 28, z: 0 } : { x: 32, y: -29 + baseLocation, z: 0 }
    }
  }

  getGap(location: Location<Color, LocationType>, ctx: MaterialContext<Color, MaterialType, LocationType>): Partial<Coordinates> {
    const { player } = ctx
    const type = (ctx as ItemContext<Color, MaterialType, LocationType>).type
    switch (type) {
      case MaterialType.Token:
        return { y: 1.5 }
      case MaterialType.Ticket:
        return { x: 0, y: 1.3, z: 0 }
      case MaterialType.LargeToken:
        return {}
      default:
        return location.player === player ? { x: -3, z: 0.01 } : { y: 1, z: 0.01 }
    }
  }

  getMaxGap(location: Location<Color, LocationType>, ctx: MaterialContext<Color, MaterialType, LocationType>): Partial<Coordinates> {
    const { player } = ctx
    const type = (ctx as ItemContext<Color, MaterialType, LocationType>).type
    switch (type) {
      case MaterialType.Ticket:
        return { y: 5 }
      case MaterialType.Card:
        return location.player === player ? { x: 71.5 } : { y: 4 }
      default:
        return {}
    }
  }

  getItemRotateZ(item: MaterialItem<Color, LocationType>, { type, player }: ItemContext<Color, MaterialType, LocationType>): number {
    return type === MaterialType.Card && item.location.player !== player ? -90 : 0
  }
}

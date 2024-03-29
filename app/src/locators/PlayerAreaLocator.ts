import Color from '@gamepark/expedition/Color'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { getRelativePlayerIndex, ItemContext, LineLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'

export class PlayerAreaLocator extends LineLocator<Color, MaterialType, LocationType> {
  getDisplayIndex(player: Color, context: ItemContext<Color, MaterialType, LocationType>) {
    if (context.player === undefined) {
      return getRelativePlayerIndex(context, player)
    } else {
      const players = context.rules.players.length
      return (getRelativePlayerIndex(context, player) + players - 1) % players
    }
  }

  getCoordinates({ location }: MaterialItem<Color, LocationType>, context: ItemContext<Color, MaterialType, LocationType>): Coordinates {
    const index = this.getDisplayIndex(location.player!, context)
    const baseLocation = index * 54.5 / (context.rules.players.length - 1)
    switch (context.type) {
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

  getDelta({ location }: MaterialItem<Color, LocationType>, { type, player }: ItemContext<Color, MaterialType, LocationType>): Partial<Coordinates> {
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

  getDeltaMax({ location }: MaterialItem<Color, LocationType>, { type, player }: ItemContext<Color, MaterialType, LocationType>): Partial<Coordinates> {
    switch (type) {
      case MaterialType.Ticket:
        return { y: 5 }
      case MaterialType.Card:
        return location.player === player ? { x: 71.5 } : { y: 4 }
      default:
        return {}
    }
  }

  getRotateZ({ location }: MaterialItem<Color, LocationType>, { type, player }: ItemContext<Color, MaterialType, LocationType>): number {
    return type === MaterialType.Card && location.player !== player ? -90 : 0
  }
}

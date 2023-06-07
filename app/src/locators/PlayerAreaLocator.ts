import { LineLocator, PlaceItemContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'

export class PlayerAreaLocator extends LineLocator<Color, MaterialType, LocationType> {
  getDisplayIndex(player: Color, context: PlaceItemContext<Color, MaterialType, LocationType>) {
    if (context.player === undefined) {
      return this.getRelativePlayerIndex(context, player)
    } else {
      const players = context.game.players.length
      return (this.getRelativePlayerIndex(context, player) + players - 1) % players
    }
  }

  getCoordinates({ location }: MaterialItem<Color, LocationType>, context: PlaceItemContext<Color, MaterialType, LocationType>): Coordinates {
    const index = this.getDisplayIndex(location.player!, context)
    const baseLocation = index * 54.5 / (context.game.players.length - 1)
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

  getDelta({ location }: MaterialItem<Color, LocationType>, { type, player }: PlaceItemContext<Color, MaterialType, LocationType>): Partial<Coordinates> {
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

  getDeltaMax({ location }: MaterialItem<Color, LocationType>, { type, player }: PlaceItemContext<Color, MaterialType, LocationType>): Partial<Coordinates> {
    switch (type) {
      case MaterialType.Ticket:
        return { y: 5 }
      case MaterialType.Card:
        return location.player === player ? { x: 71.5 } : { y: 4 }
      default:
        return {}
    }
  }

  getRotation({ location }: MaterialItem<Color, LocationType>, { type, player }: PlaceItemContext<Color, MaterialType, LocationType>): number {
    return type === MaterialType.Card && location.player !== player ? -90 : 0
  }
}

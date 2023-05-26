import { HandLocator, PlaceItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'

export class PlayerHandLocator extends HandLocator<Color, MaterialType, LocationType> {
  getDisplayIndex(player: Color, context: PlaceItemContext<Color, MaterialType, LocationType>) {
    if (context.player === undefined) {
      return this.getRelativePlayerIndex(context, player)
    } else {
      const players = context.game.players.length
      return (this.getRelativePlayerIndex(context, player) + players - 1) % players
    }
  }

  isHidden(item: MaterialItem<Color, LocationType>, context: PlaceItemContext<Color, MaterialType, LocationType>): boolean {
    return item.location.player !== context.player
  }

  getCoordinates(location: Location<Color, LocationType>, context: PlaceItemContext<Color, MaterialType, LocationType>) {
    if (location.player === this.player) {
      const count = this.countItems(location, context)
      return { x: -55 + count * 3, y: 28, z: 10 }
    } else {
      const index = this.getDisplayIndex(location.player!, context)
      const baseLocation = index * 54.5 / (context.game.players.length - 1)
      return { x: 45, y: -27 + baseLocation, z: 10 }
    }
  }

  getBaseAngle(item: MaterialItem<Color, LocationType>): number {
    return item.location.player === this.player ? 0 : -90
  }

  getGapMaxAngle(item: MaterialItem<Color, LocationType>): number {
    return item.location.player === this.player ? 1.1 : 3
  }

  getMaxAngle(item: MaterialItem<Color, LocationType>): number {
    return item.location.player === this.player ? 15 : 2.3
  }

  getRadius(item: MaterialItem<Color, LocationType>): number {
    return item.location.player === this.player ? 300 : 100
  }
}
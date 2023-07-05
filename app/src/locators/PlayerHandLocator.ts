import { HandLocator, ItemContext, MaterialContext, transformCss } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { css, Interpolation, Theme } from '@emotion/react'
import { placeCardDescription } from '../material/PlaceCardDescription'

export class PlayerHandLocator extends HandLocator<Color, MaterialType, LocationType> {
  getDisplayIndex(player: Color, context: ItemContext<Color, MaterialType, LocationType>) {
    if (context.player === undefined) {
      return this.getRelativePlayerIndex(context, player)
    } else {
      const players = context.game.players.length
      return (this.getRelativePlayerIndex(context, player) + players - 1) % players
    }
  }

  isHidden(item: MaterialItem<Color, LocationType>, context: ItemContext<Color, MaterialType, LocationType>): boolean {
    return item.location.player !== context.player
  }

  getCoordinates(location: Location<Color, LocationType>, context: ItemContext<Color, MaterialType, LocationType>) {
    if (location.player === context.player) {
      const count = this.countItems(location, context)
      return { x: -55 + count * 3, y: 28, z: 10 }
    } else {
      const index = this.getDisplayIndex(location.player!, context)
      const baseLocation = index * 54.5 / (context.game.players.length - 1)
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

  getLocations(): Location<Color, LocationType>[] {
    return [{
      type: LocationType.Hand
    }]
  }

  getLocationCss(_location: Location<Color, LocationType>, context: MaterialContext<Color, MaterialType, LocationType>): Interpolation<Theme> {
    const handLocation: Location = {
      type: LocationType.Hand,
      player: context.player
    }

    const itemContext = { ...context, type: MaterialType.Card, index: 0, displayIndex: 0 }
    const count = this.countItems(handLocation, itemContext)
    itemContext.index = count
    handLocation.x = count

    const transformations = this.transformItem({
      location: handLocation
    }, itemContext)

    return css`
      width: ${(placeCardDescription.width)}em;
      height: ${(placeCardDescription.width / placeCardDescription.ratio)}em;
      ${transformCss(...transformations)};
      border-radius: ${(placeCardDescription.borderRadius)}em;
    `
  }
}

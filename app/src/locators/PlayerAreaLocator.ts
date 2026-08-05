import Color from '@gamepark/expedition/Color'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { getRelativePlayerIndex, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { playerCompletedObjectivesLocator } from './PlayerCompletedObjectivesLocator'
import { playerLargeTokenLocator } from './PlayerLargeTokenLocator'
import { playerTicketLocator } from './PlayerTicketLocator'
import { playerTokenLocator } from './PlayerTokenLocator'

export class PlayerAreaLocator extends Locator {
  getPositionDependencies(location: Location, context: MaterialContext) {
    return {
      completedObjectives: context.rules.material(MaterialType.Card).location(LocationType.PlayerArea).player(location.player).length,
      hand: context.rules.material(MaterialType.Card).location(LocationType.Hand).player(location.player).length,
      tickets: context.rules.material(MaterialType.Ticket).location(LocationType.PlayerArea).player(location.player).length
    }
  }

  placeItem(item: MaterialItem, context: ItemContext) {
    switch (context.type) {
      case MaterialType.Token:
        return playerTokenLocator.placeItem(item, context)
      case MaterialType.Ticket:
        return playerTicketLocator.placeItem(item, context)
      case MaterialType.Card:
        return playerCompletedObjectivesLocator.placeItem(item, context)
      case MaterialType.LargeToken:
        return playerLargeTokenLocator.placeItem(item, context)
      default:
        return super.placeItem(item, context)
    }
  }

  getHoverTransform(item: MaterialItem, context: ItemContext) {
    switch (context.type) {
      case MaterialType.Token:
        return playerTokenLocator.getHoverTransform(item, context)
      case MaterialType.Ticket:
        return playerTicketLocator.getHoverTransform(item, context)
      case MaterialType.Card:
        return playerCompletedObjectivesLocator.getHoverTransform(item, context)
      case MaterialType.LargeToken:
        return playerLargeTokenLocator.getHoverTransform(item, context)
      default:
        return super.getHoverTransform(item, context)
    }
  }
}

export function getPlayerDisplayIndex(player: Color, context: MaterialContext) {
  if (context.player === undefined) {
    return getRelativePlayerIndex(context, player)
  } else {
    const players = context.rules.players.length
    return (getRelativePlayerIndex(context, player) + players - 1) % players
  }
}
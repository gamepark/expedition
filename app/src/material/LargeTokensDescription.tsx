/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { LargeTokenRules } from './LargeTokenRules'
import { MaterialGame } from '../../../../workshop/packages/rules-api'
import { PlayerTokenDescription } from './PlayerTokenDescription'

export class LargeTokenDescription extends PlayerTokenDescription {
  diameter = 3.5

  getItems(game: MaterialGame) {
    return game.players.map(color => ({
      id: color,
      location: { type: LocationType.PlayerArea, player: color }
    }))
  }

  rules = LargeTokenRules
}

export const largeTokenDescription = new LargeTokenDescription()

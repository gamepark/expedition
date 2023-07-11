/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { LargeTokenRules } from './LargeTokenRules'
import { PlayerTokenDescription } from './PlayerTokenDescription'
import { MaterialContext } from '@gamepark/react-game'

export class LargeTokenDescription extends PlayerTokenDescription {
  diameter = 3.5

  getStaticItems({ game }: MaterialContext) {
    return game.players.map(color => ({
      id: color,
      location: { type: LocationType.PlayerArea, player: color }
    }))
  }

  rules = LargeTokenRules
}

export const largeTokenDescription = new LargeTokenDescription()

/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { LargeTokenHelp } from './LargeTokenHelp'
import { PlayerTokenDescription } from './PlayerTokenDescription'
import { MaterialContext } from '@gamepark/react-game'

export class LargeTokenDescription extends PlayerTokenDescription {
  diameter = 3.5

  getStaticItems({ rules }: MaterialContext) {
    return rules.players.map(color => ({
      id: color,
      location: { type: LocationType.PlayerArea, player: color }
    }))
  }

  help = LargeTokenHelp
}

export const largeTokenDescription = new LargeTokenDescription()

/** @jsxImportSource @emotion/react */
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { LargeTokenRules } from './LargeTokenRules'
import { MaterialGame } from '../../../../workshop/packages/rules-api'
import { PlayerTokenDescription } from './PlayerTokenDescription'

export class LargeTokenDescription extends PlayerTokenDescription {
  diameter = 3.5
  items = (game: MaterialGame<Color, MaterialType, LocationType>) => game.players.map(color => ({
    id: color,
    location: { type: LocationType.PlayerArea, player: color }
  }))
  rules = LargeTokenRules
}

export const largeTokenDescription = new LargeTokenDescription()

/** @jsxImportSource @emotion/react */
import red from '../images/tokens/red-token.jpg'
import pink from '../images/tokens/pink-token.jpg'
import blue from '../images/tokens/blue-token.jpg'
import green from '../images/tokens/green-token.jpg'
import yellow from '../images/tokens/yellow-token.jpg'
import white from '../images/tokens/white-token.jpg'
import { MaterialComponentType, TokenMaterialDescription } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { Coordinates } from '../../../../workshop/packages/rules-api'
import { LargeTokenRules } from './LargeTokenRules'

export const LargeTokensDescription: TokenMaterialDescription<Color, Color, MaterialType, LocationType> = {
  type: MaterialComponentType.Token,
  props: {
    image: {
      [Color.Red]: red,
      [Color.Pink]: pink,
      [Color.Blue]: blue,
      [Color.Green]: green,
      [Color.Yellow]: yellow,
      [Color.White]: white
    },
    height: 3.5,
    ratio: 1,
    borderRadius: 2
  },
  items: (game, player) => game.players.map(color => ({ id: color, position: getColorTokenPosition(color, game.players, player) })),
  rules: LargeTokenRules
}

const getColorTokenPosition = (color: Color, players: Color[], player?: Color): Coordinates => {
  const colorIndex = players.indexOf(color)
  const playerIndex = player !== undefined ? players.indexOf(player) : players.length - 1
  const index = (colorIndex - playerIndex - 1 + players.length) % players.length
  return { x: 38.5, y: -30.5 + (index % players.length) * 54.5 / (players.length - 1), z: 0 }
}

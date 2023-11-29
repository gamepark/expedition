/** @jsxImportSource @emotion/react */
import red from '../images/tokens/red-token.jpg'
import pink from '../images/tokens/pink-token.jpg'
import blue from '../images/tokens/blue-token.jpg'
import green from '../images/tokens/green-token.jpg'
import yellow from '../images/tokens/yellow-token.jpg'
import white from '../images/tokens/white-token.jpg'
import { RoundTokenDescription } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { TokenHelp } from './TokenHelp'

export class PlayerTokenDescription extends RoundTokenDescription {
  diameter = 1.4
  thickness = 0.3

  images = {
    [Color.Red]: red,
    [Color.Pink]: pink,
    [Color.Blue]: blue,
    [Color.Green]: green,
    [Color.Yellow]: yellow,
    [Color.White]: white
  }

  help = TokenHelp
}

export const playerTokensDescription = new PlayerTokenDescription()

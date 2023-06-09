/** @jsxImportSource @emotion/react */
import red from '../images/tokens/red-token.jpg'
import pink from '../images/tokens/pink-token.jpg'
import blue from '../images/tokens/blue-token.jpg'
import green from '../images/tokens/green-token.jpg'
import yellow from '../images/tokens/yellow-token.jpg'
import white from '../images/tokens/white-token.jpg'
import { MaterialComponentType, TokenMaterialDescription } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { TokenRules } from './TokenRules'

export const tokensProps = {
  height: 1.4,
  ratio: 1,
  borderRadius: 1,
  image: {
    [Color.Red]: red,
    [Color.Pink]: pink,
    [Color.Blue]: blue,
    [Color.Green]: green,
    [Color.Yellow]: yellow,
    [Color.White]: white
  }
}


export const TokensDescription: TokenMaterialDescription<Color> = {
  type: MaterialComponentType.Token,
  props: tokensProps,
  rules: TokenRules
}

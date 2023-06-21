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
import { LargeTokenRules } from './LargeTokenRules'
import { MaterialGame } from '../../../../workshop/packages/rules-api'

export class LargeTokenDescription extends TokenMaterialDescription<Color, MaterialType, LocationType> {
  type: typeof MaterialComponentType.Token = MaterialComponentType.Token

  getProps() {
    return ({
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
    })
  }

  items = (game: MaterialGame<Color, MaterialType, LocationType>) => game.players.map(color => ({
    id: color,
    location: { type: LocationType.PlayerArea, player: color }
  }))
  rules = LargeTokenRules
}

export const largeTokenDescription = new LargeTokenDescription()

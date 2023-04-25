import red from '../images/tokens/red-token.jpg'
import pink from '../images/tokens/pink-token.jpg'
import blue from '../images/tokens/blue-token.jpg'
import green from '../images/tokens/green-token.jpg'
import yellow from '../images/tokens/yellow-token.jpg'
import white from '../images/tokens/white-token.jpg'
import {MaterialComponentType, MaterialRulesContext, TokenMaterialDescription} from '@gamepark/react-components'
import Color from '@gamepark/expedition/Color'
import {TFunction} from 'i18next'
import {Trans} from 'react-i18next'
import {getPlayerName} from '@gamepark/expedition/ExpeditionOptions'

export const TokensDescription: TokenMaterialDescription<Color> = {
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
    height: 1.4,
    ratio: 1,
    borderRadius: 1
  },
  rules: (t: TFunction, {item}: MaterialRulesContext) =>
    <>
      <h2>{t('rules.token.title', {player: getPlayerName(item.id!, t)})}</h2>
      <p><Trans defaults="rules.token.purpose" components={[<strong/>]}/></p>
    </>
}
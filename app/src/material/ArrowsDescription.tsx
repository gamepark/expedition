/** @jsxImportSource @emotion/react */
import red from '../images/arrows/red-arrow.png'
import blue from '../images/arrows/blue-arrow.png'
import yellow from '../images/arrows/yellow-arrow.png'
import { MaterialComponentType, TokenMaterialDescription } from '@gamepark/react-game'
import { ArrowColor } from '@gamepark/expedition/material/ArrowColor'
import { ArrowRules } from './ArrowRules'

export const ArrowsDescription: TokenMaterialDescription<ArrowColor> = {
  type: MaterialComponentType.Token,
  props: {
    image: {
      [ArrowColor.Red]: red,
      [ArrowColor.Blue]: blue,
      [ArrowColor.Yellow]: yellow
    },
    height: 4.5,
    ratio: 160 / 530
  },
  rules: ArrowRules
}

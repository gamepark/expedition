/** @jsxImportSource @emotion/react */
import red from '../images/arrows/red-arrow.png'
import blue from '../images/arrows/blue-arrow.png'
import yellow from '../images/arrows/yellow-arrow.png'
import { MaterialComponentType, MaterialRulesProps, TokenMaterialDescription } from '@gamepark/react-components'
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
    ratio: 135 / 500
  },
  rules: (props: MaterialRulesProps) => <ArrowRules {...props}/>
}

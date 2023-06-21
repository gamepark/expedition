/** @jsxImportSource @emotion/react */
import red from '../images/arrows/red-arrow.png'
import blue from '../images/arrows/blue-arrow.png'
import yellow from '../images/arrows/yellow-arrow.png'
import { ArrowColor } from '@gamepark/expedition/material/ArrowColor'
import { ArrowRules } from './ArrowRules'
import { MaterialComponentType, TokenMaterialDescription } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'

class ArrowDescription extends TokenMaterialDescription<Color, MaterialType, LocationType> {
  type: typeof MaterialComponentType.Token = MaterialComponentType.Token

  getProps() {
    return ({
      image: {
        [ArrowColor.Red]: red,
        [ArrowColor.Blue]: blue,
        [ArrowColor.Yellow]: yellow
      },
      height: 4.5,
      ratio: 160 / 530
    })
  }

  rules = ArrowRules
}

export const arrowDescription = new ArrowDescription()

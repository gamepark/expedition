/** @jsxImportSource @emotion/react */
import red from '../images/arrows/red-arrow.png'
import blue from '../images/arrows/blue-arrow.png'
import yellow from '../images/arrows/yellow-arrow.png'
import { ArrowColor } from '@gamepark/expedition/material/ArrowColor'
import { ArrowRules } from './ArrowRules'
import { TokenDescription } from '@gamepark/react-game'

class ArrowDescription extends TokenDescription {

  width = 1.44
  height = 4.77

  images = {
    [ArrowColor.Red]: red,
    [ArrowColor.Blue]: blue,
    [ArrowColor.Yellow]: yellow
  }

  rules = ArrowRules
}

export const arrowDescription = new ArrowDescription()

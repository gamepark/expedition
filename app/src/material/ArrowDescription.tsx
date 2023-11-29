/** @jsxImportSource @emotion/react */
import { ArrowColor } from '@gamepark/expedition/material/ArrowColor'
import { TokenDescription } from '@gamepark/react-game'
import blue from '../images/arrows/blue-arrow.png'
import red from '../images/arrows/red-arrow.png'
import yellow from '../images/arrows/yellow-arrow.png'
import { ArrowHelp } from './ArrowHelp'

class ArrowDescription extends TokenDescription {

  width = 1.44
  height = 4.77

  images = {
    [ArrowColor.Red]: red,
    [ArrowColor.Blue]: blue,
    [ArrowColor.Yellow]: yellow
  }

  help = ArrowHelp
}

export const arrowDescription = new ArrowDescription()

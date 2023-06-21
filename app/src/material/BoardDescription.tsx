/** @jsxImportSource @emotion/react */
import board from '../images/board.jpg'
import { BoardMaterialDescription, MaterialComponentType } from '@gamepark/react-game'
import { BoardRules } from './BoardRules'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'

export const boardRatio = 2053 / 1554

export class BoardDescription extends BoardMaterialDescription<Color, MaterialType, LocationType> {
  type: typeof MaterialComponentType.Board = MaterialComponentType.Board

  getProps() {
    return ({
      image: board,
      height: 56,
      ratio: boardRatio
    })
  }

  items = () => [{ location: { type: LocationType.Board } }]
  rules = BoardRules
}

export const boardDescription = new BoardDescription()

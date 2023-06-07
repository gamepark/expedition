/** @jsxImportSource @emotion/react */
import board from '../images/board.jpg'
import { BoardMaterialDescription, MaterialComponentType } from '@gamepark/react-game'
import { BoardRules } from './BoardRules'
import { LocationType } from '@gamepark/expedition/material/LocationType'

export const boardRatio = 2053 / 1554

export const BoardDescription: BoardMaterialDescription = {
  type: MaterialComponentType.Board,
  props: {
    image: board,
    height: 56,
    ratio: boardRatio
  },
  items: () => [{ location: { type: LocationType.Board } }],
  rules: BoardRules
}


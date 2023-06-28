/** @jsxImportSource @emotion/react */
import board from '../images/board.jpg'
import frenchBoard from '../images/board-fr.jpg'
import { BoardDescription } from '@gamepark/react-game'
import { BoardRules } from './BoardRules'
import { LocationType } from '@gamepark/expedition/material/LocationType'

class ExpeditionBoardDescription extends BoardDescription {
  image = board
  height = 56
  width = 74
  item = { location: { type: LocationType.Board } }
  rules = BoardRules
}

export const boardDescription = new ExpeditionBoardDescription()
export const boardRatio = boardDescription.width / boardDescription.height

class FrenchBoardDescription extends ExpeditionBoardDescription {
  image = frenchBoard
}

export const frenchBoardDescription = new FrenchBoardDescription()
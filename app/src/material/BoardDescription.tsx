/** @jsxImportSource @emotion/react */
import board from '../images/board.jpg'
import frenchBoard from '../images/board-fr.jpg'
import { BoardDescription } from '@gamepark/react-game'
import { BoardRules } from './BoardRules'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { nodes, RedNode, roads } from '@gamepark/expedition/material/Road'
import { Location } from '@gamepark/rules-api'

class ExpeditionBoardDescription extends BoardDescription {
  image = board
  height = 56
  width = 74
  staticItem = { location: { type: LocationType.Board } }
  thickness = 0 // Can be removed once the animations are parabolic so that the material do not pass under the board
  locations = nodes.map<Location>(place => ({ type: LocationType.Place, id: place }))
    .concat([
      { type: LocationType.Place, id: RedNode.CraterLake_NorthWest, x: 1 },
      { type: LocationType.Place, id: RedNode.Teotihuacan_SouthWest, x: 1 },
      { type: LocationType.Place, id: RedNode.RapaNui_South, x: 1 }
    ])
    .concat(roads.map(road => ({ type: LocationType.Road, id: road })))
  rules = BoardRules
}

export const boardDescription = new ExpeditionBoardDescription()
export const boardRatio = boardDescription.width / boardDescription.height

class FrenchBoardDescription extends ExpeditionBoardDescription {
  image = frenchBoard
}

export const frenchBoardDescription = new FrenchBoardDescription()
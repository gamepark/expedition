import board from '../images/board.jpg'
import {BoardMaterialDescription, MaterialComponentType} from '@gamepark/react-components'

export const BoardDescription: BoardMaterialDescription = {
  type: MaterialComponentType.Board,
  props: {
    image: board,
    height: 56,
    ratio: 2053 / 1554
  },
  items: [{position: {x: -10, y: -5, z: 0}}]
}
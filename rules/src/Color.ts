import {isEnumValue} from '@gamepark/rules-api'

enum Color {
  Red = 1, Pink, Blue, Green, Yellow, White
}

export default Color

export const playerColors = Object.values(Color).filter(isEnumValue)

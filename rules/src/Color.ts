import { getEnumValues } from '@gamepark/rules-api'

enum Color {
  Red = 1, Pink, Blue, Green, Yellow, White
}

export default Color

export const playerColors = getEnumValues(Color)

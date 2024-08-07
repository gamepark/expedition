import { getEnumValues } from '@gamepark/rules-api'

export enum ArrowColor {
  Yellow = 1, Blue, Red
}

export const arrowColors = getEnumValues(ArrowColor)

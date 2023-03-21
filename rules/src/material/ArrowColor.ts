import {isEnumValue} from '../../../../workshop/packages/rules-api'

export enum ArrowColor {
  Yellow = 1, Blue, Red
}

export const arrowColors = Object.values(ArrowColor).filter<ArrowColor>(isEnumValue)

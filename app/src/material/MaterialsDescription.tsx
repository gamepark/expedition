import {MaterialType} from '@gamepark/expedition/material/ExpeditionMaterial'
import {CardsDescription} from './CardsDescription'
import {BoardDescription} from './BoardDescription'
import {MaterialDescription} from '@gamepark/react-components'

export const MaterialsDescription: Record<MaterialType, MaterialDescription> = {
  [MaterialType.Board]: BoardDescription,
  [MaterialType.Card]: CardsDescription,
  [MaterialType.Token]: CardsDescription,
  [MaterialType.Arrow]: CardsDescription,
  [MaterialType.Ticket]: CardsDescription
}
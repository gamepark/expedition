import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { placeCardDescription } from './PlaceCardDescription'
import { boardDescription, frenchBoardDescription } from './BoardDescription'
import { MaterialDescription } from '@gamepark/react-game'
import { playerTokensDescription } from './PlayerTokenDescription'
import { ticketDescription } from './TicketDescription'
import { arrowDescription } from './ArrowDescription'
import { largeTokenDescription } from './LargeTokensDescription'
import { placeCardFrenchDescription } from './PlaceCardFrenchDescription'

export const material: Record<MaterialType, MaterialDescription> = {
  [MaterialType.Board]: boardDescription,
  [MaterialType.Card]: placeCardDescription,
  [MaterialType.Token]: playerTokensDescription,
  [MaterialType.Arrow]: arrowDescription,
  [MaterialType.Ticket]: ticketDescription,
  [MaterialType.LargeToken]: largeTokenDescription
}

export const materialI18n: Record<string, Partial<Record<MaterialType, MaterialDescription>>> = {
  'fr': {
    [MaterialType.Board]: frenchBoardDescription,
    [MaterialType.Card]: placeCardFrenchDescription
  }
}

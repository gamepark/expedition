import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { cardDescription } from './PlaceCardDescription'
import { boardDescription } from './BoardDescription'
import { MaterialDescription } from '@gamepark/react-game'
import { playerTokensDescription } from './PlayerTokenDescription'
import { ticketDescription } from './TicketDescription'
import { arrowDescription } from './ArrowDescription'
import { largeTokenDescription } from './LargeTokensDescription'

export const Material: Record<MaterialType, MaterialDescription> = {
  [MaterialType.Board]: boardDescription,
  [MaterialType.Card]: cardDescription,
  [MaterialType.Token]: playerTokensDescription,
  [MaterialType.Arrow]: arrowDescription,
  [MaterialType.Ticket]: ticketDescription,
  [MaterialType.LargeToken]: largeTokenDescription
}

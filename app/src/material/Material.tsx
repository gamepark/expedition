import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { cardDescription } from './CardDescription'
import { boardDescription } from './BoardDescription'
import { MaterialDescription } from '@gamepark/react-game'
import { tokensDescription } from './TokenDescription'
import { ticketDescription } from './TicketDescription'
import { arrowDescription } from './ArrowDescription'
import { largeTokenDescription } from './LargeTokensDescription'

export const Material: Record<MaterialType, MaterialDescription> = {
  [MaterialType.Board]: boardDescription,
  [MaterialType.Card]: cardDescription,
  [MaterialType.Token]: tokensDescription,
  [MaterialType.Arrow]: arrowDescription,
  [MaterialType.Ticket]: ticketDescription,
  [MaterialType.LargeToken]: largeTokenDescription
}

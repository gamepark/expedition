import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { CardsDescription } from './CardsDescription'
import { BoardDescription } from './BoardDescription'
import { MaterialDescription } from '@gamepark/react-game'
import { TokensDescription } from './TokensDescription'
import { TicketDescription } from './TicketDescription'
import { ArrowsDescription } from './ArrowsDescription'
import { LargeTokensDescription } from './LargeTokensDescription'

export const Material: Record<MaterialType, MaterialDescription> = {
  [MaterialType.Board]: BoardDescription,
  [MaterialType.Card]: CardsDescription,
  [MaterialType.Token]: TokensDescription,
  [MaterialType.Arrow]: ArrowsDescription,
  [MaterialType.Ticket]: TicketDescription,
  [MaterialType.LargeToken]: LargeTokensDescription
}
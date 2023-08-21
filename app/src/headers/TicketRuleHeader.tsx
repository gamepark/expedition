/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { isCustomMoveType, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { PlayMoveButton, useGame, useLegalMoves, usePlayerName } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { CustomMoveType } from '@gamepark/expedition/rules/CustomMoveType'

export const TicketRuleHeader = () => {
  const { t } = useTranslation()
  const rule = useGame<MaterialGame<Color, MaterialType, LocationType>>()!.rule!
  const legalMoves = useLegalMoves<MaterialMove>()
  const exchangeCard = legalMoves.find(isCustomMoveType(CustomMoveType.ExchangeCard))
  const playerName = usePlayerName(rule.player!)
  if (legalMoves.length) {
    return <Trans defaults="header.ticket.me"><PlayMoveButton move={exchangeCard}/></Trans>
  } else {
    return <>{t('header.ticket', { player: playerName })}</>
  }
}

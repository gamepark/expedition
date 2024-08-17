/** @jsxImportSource @emotion/react */
import Color from '@gamepark/expedition/Color'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { PlayMoveButton, useGame, useLegalMoves, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const TicketRuleHeader = () => {
  const { t } = useTranslation()
  const rule = useGame<MaterialGame<Color, MaterialType, LocationType>>()!.rule!
  const legalMoves = useLegalMoves<MaterialMove>()
  const exchangeCard = legalMoves.find((move: MaterialMove) =>
    isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Hand
  )
  const playerName = usePlayerName(rule.player!)
  if (legalMoves.length) {
    return <Trans defaults="header.ticket.me"><PlayMoveButton move={exchangeCard}/></Trans>
  } else {
    return <>{t('header.ticket', { player: playerName })}</>
  }
}

/** @jsxImportSource @emotion/react */
import { getPlayerName } from '@gamepark/expedition/ExpeditionOptions'
import { Trans, useTranslation } from 'react-i18next'
import { MaterialGame, MaterialRulesMove, MoveKind } from '@gamepark/rules-api'
import { PlayMoveButton, useGame, useLegalMoves, usePlayerName } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { CustomMoveType } from '@gamepark/expedition/rules/CustomMoveType'

export const TicketRuleHeader = () => {
  const { t } = useTranslation()
  const rule = useGame<MaterialGame<Color, MaterialType, LocationType>>()!.rule!
  const legalMoves = useLegalMoves<MaterialRulesMove<Color, MaterialType, LocationType>>()
  const exchangeCard = legalMoves.find(move => move.kind === MoveKind.CustomMove && move.type === CustomMoveType.ExchangeCard)
  const playerName = usePlayerName(rule.player!) || getPlayerName(rule.player!, t)
  if (legalMoves.length) {
    return <Trans defaults="header.ticket.me" components={[<PlayMoveButton move={exchangeCard}/>]}/>
  } else {
    return <>{t('header.ticket', { player: playerName })}</>
  }
}
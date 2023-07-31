/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { isEndGame, isStartPlayerTurn, MaterialMove } from '@gamepark/rules-api'
import { PlayMoveButton, useLegalMove, usePlayerName, useRules } from '@gamepark/react-game'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { ArrowColor } from '@gamepark/expedition/material/ArrowColor'
import { Memory } from '@gamepark/expedition/rules/Memory'

export const LoopRuleHeader = () => {
  const { t } = useTranslation()
  const passMove = useLegalMove<MaterialMove>(move => isStartPlayerTurn(move) || isEndGame(move))
  const rules = useRules<ExpeditionRules>()!
  const arrow = rules.remind<ArrowColor>(Memory.LastArrowMoved)
  const playerName = usePlayerName(rules.game.rule!.player)
  if (!passMove) {
    return <>{t('header.loop', { player: playerName, arrow })}</>
  }
  return (
    <Trans defaults="header.loop.me" values={{ arrow }}>
      <PlayMoveButton move={passMove}/>
    </Trans>
  )
}

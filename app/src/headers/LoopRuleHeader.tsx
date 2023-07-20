/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { isEndGame, isStartPlayerTurn, MaterialMove } from '@gamepark/rules-api'
import { PlayMoveButton, useLegalMove, usePlayerName, useRulesStep } from '@gamepark/react-game'
import { PlayerTurnMemory } from '@gamepark/expedition/rules/PlayerTurn'
import { LoopRule } from '@gamepark/expedition/rules/LoopRule'

export const LoopRuleHeader = () => {
  const { t } = useTranslation()
  const passMove = useLegalMove<MaterialMove>(move => isStartPlayerTurn(move) || isEndGame(move))
  const loopRule = useRulesStep<LoopRule>()!
  const { expeditionColor } = loopRule.getMemory<PlayerTurnMemory>()
  const playerName = usePlayerName(loopRule.player)
  if (!passMove) {
    return <>{t('header.loop', { player: playerName, arrow: expeditionColor })}</>
  }
  return (
    <Trans defaults="header.loop.me" values={{ arrow: expeditionColor }}>
      <PlayMoveButton move={passMove}/>
    </Trans>
  )
}

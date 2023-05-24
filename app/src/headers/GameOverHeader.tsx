/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { getPlayerName } from '@gamepark/expedition/ExpeditionOptions'

export const GameOverHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<ExpeditionRules>()
  const player = usePlayerId()
  if (!rules) return null
  const bestScore = Math.max(...rules.game.players.map(player => rules.getScore(player)))
  const winners = rules.game.players.filter(player => rules.getScore(player) === bestScore)
  const winnerName = winners.length === 1 ? usePlayerName(winners[0]) ?? getPlayerName(winners[0], t) : ''
  if (winners.length === 1) {
    if (winners[0] !== player) {
      return <>{t('game.over', { winner: winnerName, score: bestScore })}</>
    } else {
      return <>{t('game.over.win', { score: bestScore })}</>
    }
  } else {
    return <>{t('game.over.tie', { score: bestScore })}</>
  }
}

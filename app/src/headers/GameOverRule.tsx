/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { css } from '@emotion/react'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'

export const GameOverRule = () => {
  const { t } = useTranslation()
  const rules = useRules<ExpeditionRules>()!
  const player = usePlayerId()
  return (
    <div css={rulesCss}>
      <h2>{t('rules.end')}</h2>
      <p><strong>{t('rules.score')}</strong></p>
      <p><Trans defaults="rules.score.card"><strong css={css`color: darkgreen;`}/></Trans></p>
      <p><Trans defaults="rules.score.token"><strong css={css`color: darkgreen;`}/></Trans></p>
      <p><Trans defaults="rules.malus.card"><strong css={css`color: darkred;`}/></Trans></p>
      <p><Trans defaults="rules.malus.token"><strong css={css`color: darkred;`}/></Trans></p>
      <p>{t('rules.winner')}</p>
      {player && <p><Trans defaults="rules.score.mine" values={{
        score: rules.getScore(player),
        tickets: rules.getTieBreaker(1, player)
      }}><strong css={css`color: darkgreen;`}/><strong css={css`color: darkred;`}/></Trans></p>}
      {rules.players.filter(p => p !== player).map(player => <PlayerStats key={player} rules={rules} player={player}/>)}
    </div>
  )
}

const PlayerStats = ({ rules, player }: { rules: ExpeditionRules, player: number }) => {
  const playerName = usePlayerName(player)
  return <p><Trans defaults="rules.score.player" values={{
    player: playerName,
    score: rules.getScore(player),
    tickets: rules.getTieBreaker(1, player)
  }}><strong css={css`color: darkgreen;`}/><strong css={css`color: darkred;`}/></Trans></p>
}

const rulesCss = css`
  max-width: 40em;
  margin: 1em;
  font-size: 3em;

  > h2 {
    margin-right: 2em;
  }

  > p {
    white-space: break-spaces;
  }
`

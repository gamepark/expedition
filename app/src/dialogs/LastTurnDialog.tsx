/** @jsxImportSource @emotion/react */
import { RulesDialog, ThemeButton, usePlayerName, useRules } from '@gamepark/react-game'
import { useEffect, useState } from 'react'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { useTranslation } from 'react-i18next'
import { getPlayerName } from '@gamepark/expedition/ExpeditionOptions'
import Color from '@gamepark/expedition/Color'
import { css } from '@emotion/react'

export const LastTurnDialog = () => {
  const { t } = useTranslation()
  const rules = useRules<ExpeditionRules>()
  const lastTurn = !rules?.isOver() && rules?.isLastTurn
  const [explainLastTurn, setExplainLastTurn] = useState(false)
  const lastPlayer = rules ? rules.game.players[rules.game.players.length - 1] : Color.Red
  const lastPlayerName = usePlayerName(lastPlayer) || getPlayerName(lastPlayer, t)
  useEffect(() => {
      if (lastTurn) setExplainLastTurn(true)
    }, [lastTurn]
  )
  return (
    <RulesDialog open={explainLastTurn} close={() => setExplainLastTurn(false)}>
      <div css={rulesCss}>
        <h2>{t('rules.lastTurn')}</h2>
        <p>{t('rules.lastTurn.lastPlayer', { player: lastPlayerName })}</p>
        <p>{t('rules.lastTurn.text')}</p>
        <ThemeButton onClick={() => setExplainLastTurn(false)}>{t('OK')}</ThemeButton>
      </div>
    </RulesDialog>
  )
}

const rulesCss = css`
  max-width: 40em;
  margin: 1em;
  font-size: 3em;

  > h2 {
    margin: 0 1em;
    text-align: center;
  }

  > p {
    white-space: break-spaces;
  }
`
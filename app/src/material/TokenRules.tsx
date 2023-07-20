/** @jsxImportSource @emotion/react */
import { MaterialRulesProps, usePlayerName } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'

export const TokenRules = ({ item }: MaterialRulesProps) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(item.id!)
  return <>
    <h2>{t('rules.token.title', { player: playerName })}</h2>
    <p><Trans defaults="rules.token.purpose"><strong/></Trans></p>
  </>
}

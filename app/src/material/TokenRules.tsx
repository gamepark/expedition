/** @jsxImportSource @emotion/react */
import { MaterialRulesProps, usePlayerName } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import { getPlayerName } from '@gamepark/expedition/ExpeditionOptions'

export const TokenRules = ({ item }: MaterialRulesProps) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(item.id!) || getPlayerName(item.id!, t)
  return <>
    <h2>{t('rules.token.title', { player: playerName })}</h2>
    <p><Trans defaults="rules.token.purpose" components={[<strong/>]}/></p>
  </>
}

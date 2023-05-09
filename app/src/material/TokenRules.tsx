/** @jsxImportSource @emotion/react */
import { MaterialRulesProps } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import { getPlayerName } from '@gamepark/expedition/ExpeditionOptions'

export const TokenRules = ({ item }: MaterialRulesProps) => {
  const { t } = useTranslation()
  return <>
    <h2>{t('rules.token.title', { player: getPlayerName(item.id!, t) })}</h2>
    <p><Trans defaults="rules.token.purpose" components={[<strong/>]}/></p>
  </>
}

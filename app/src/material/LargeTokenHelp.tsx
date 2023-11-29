/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, usePlayerName } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const LargeTokenHelp = ({ item }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(item.id!)
  return <>
    <h2>{t('rules.token.title', { player: playerName })}</h2>
    <p>{t('rules.largeToken.purpose')}</p>
  </>
}

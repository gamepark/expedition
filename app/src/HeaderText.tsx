/** @jsxImportSource @emotion/react */
import { getPlayerName } from '@gamepark/expedition/ExpeditionOptions'
import { usePlayerId } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { MaterialGame } from '@gamepark/rules-api'

type Props = {
  loading: boolean
  game?: MaterialGame
}

export default function HeaderText({ loading }: Props) {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  if (loading) return <>{t('Game loading...')}</>
  return <>Loaded! Now what? Your player id is {getPlayerName(playerId, t)}</>
}
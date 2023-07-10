/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'
import { MaterialGame } from '@gamepark/rules-api'
import { useGame, usePlayerId, usePlayerName } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'

export const ChooseCardRuleHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<Color, MaterialType, LocationType>>()!
  const currentPlayer = game.rule!.player!
  const me = usePlayerId<Color>()
  const playerName = usePlayerName(currentPlayer)
  return <>{
    currentPlayer === me
      ? t('header.chooseCard.me')
      : t('header.chooseCard', { player: playerName })
  }</>
}

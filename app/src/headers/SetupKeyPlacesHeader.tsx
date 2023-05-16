/** @jsxImportSource @emotion/react */
import { getPlayerName } from '@gamepark/expedition/ExpeditionOptions'
import { useTranslation } from 'react-i18next'
import { MaterialGame } from '@gamepark/rules-api'
import { useGame, usePlayerId } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import Color from '@gamepark/expedition/Color'

export const SetupKeyPlacesHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<Color, MaterialType, LocationType>>()
  const currentPlayer = game.rule!.player!
  const me = usePlayerId<Color>()
  return <>{
    currentPlayer === me
      ? t('header.setup.me')
      : t('header.setup', { player: getPlayerName(currentPlayer, t) })
  }</>
}

/** @jsxImportSource @emotion/react */
import { getPlayerName } from '@gamepark/expedition/ExpeditionOptions'
import { Trans, useTranslation } from 'react-i18next'
import { isEndGame, isStartPlayerTurn, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { PlayMoveButton, useGame, useLegalMove, usePlayerName } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { LoopRuleMemory } from '@gamepark/expedition/rules/LoopRule'

export const LoopRuleHeader = () => {
  const { t } = useTranslation()
  const passMove = useLegalMove<MaterialMove>(move => isStartPlayerTurn(move) || isEndGame(move))
  const rule = useGame<MaterialGame<Color, MaterialType, LocationType>>()!.rule!
  const { loopColor } = rule.memory as LoopRuleMemory
  const playerName = usePlayerName(rule.player!) || getPlayerName(rule.player!, t)
  if (!passMove) {
    return <>{t('header.loop', { player: playerName, arrow: loopColor })}</>
  }
  return <Trans defaults="header.loop.me" components={[<PlayMoveButton move={passMove}/>]} values={{ arrow: loopColor }}/>
}

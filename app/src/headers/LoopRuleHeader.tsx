/** @jsxImportSource @emotion/react */
import { getPlayerName } from '@gamepark/expedition/ExpeditionOptions'
import { Trans, useTranslation } from 'react-i18next'
import { MaterialGame, MaterialRulesMove, MoveKind, RuleMoveType } from '@gamepark/rules-api'
import { PlayMoveButton, useGame, useLegalMoves, usePlayerName } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { LoopRuleMemory } from '@gamepark/expedition/rules/LoopRule'

export const LoopRuleHeader = () => {
  const { t } = useTranslation()
  const rule = useGame<MaterialGame<Color, MaterialType, LocationType>>()!.rule!
  const legalMoves = useLegalMoves<MaterialRulesMove<Color, MaterialType, LocationType>>()
  const { loopColor } = rule.memory as LoopRuleMemory
  const playerName = usePlayerName(rule.player!) ?? getPlayerName(rule.player!, t)
  if (!legalMoves.length) {
    return <>{t('header.loop', { player: playerName, arrow: loopColor })}</>
  }
  const passMove = legalMoves.find(move =>
    move.kind === MoveKind.RulesMove && (move.type === RuleMoveType.StartPlayerTurn || move.type === RuleMoveType.EndGame)
  )
  return <Trans defaults="header.loop.me" components={[<PlayMoveButton move={passMove}/>]} values={{ arrow: loopColor }}/>
}

/** @jsxImportSource @emotion/react */
import { getPlayerName } from '@gamepark/expedition/ExpeditionOptions'
import { Trans, useTranslation } from 'react-i18next'
import { MaterialGame, MaterialRulesMove, MoveKind, RuleMoveType } from '@gamepark/rules-api'
import { RuleId } from '@gamepark/expedition/rules/RuleId'
import { PlayMoveButton, useGame, useLegalMoves } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { PlayerTurnData } from '@gamepark/expedition/rules/PlayerTurn'

export const PlayerTurnHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<Color, MaterialType, LocationType>>()
  const legalMoves = useLegalMoves<MaterialRulesMove<Color, MaterialType, LocationType>>()
  if (!legalMoves.length) {
    return <>{t('header.turn', { player: getPlayerName(game.rule!.player!, t) })}</>
  }
  const passMove = legalMoves.find(move => move.kind === MoveKind.RulesMove && move.type === RuleMoveType.StartPlayerTurn && move.id === RuleId.PlayerTurn)
  const playTicket = legalMoves.find(move => move.kind === MoveKind.MaterialMove && move.itemType === MaterialType.Ticket)
  const canPlaceArrow = legalMoves.some(move => move.kind === MoveKind.MaterialMove && move.itemType === MaterialType.Arrow)
  const { loopColor } = game.rule!.memory as PlayerTurnData
  if (!passMove) {
    if (playTicket) {
      return <Trans defaults="header.turn.arrowTicket" components={[<PlayMoveButton move={playTicket}/>]}/>
    } else {
      return <>{t('header.turn.arrow')}</>
    }
  } else if (loopColor) {
    return <Trans defaults="header.turn.loop" components={[<PlayMoveButton move={passMove}/>]} values={{ arrow: loopColor }}/>
  } else if (canPlaceArrow) {
    if (playTicket) {
      return <Trans defaults="header.turn.extraArrowTicket" components={[<PlayMoveButton move={playTicket}/>, <PlayMoveButton move={passMove}/>]}/>
    } else {
      return <Trans defaults="header.turn.extraArrow" components={[<PlayMoveButton move={passMove}/>]}/>
    }
  } else if (playTicket) {
    return <Trans defaults="header.turn.ticket" components={[<PlayMoveButton move={playTicket}/>, <PlayMoveButton move={passMove}/>]}/>
  } else {
    return <Trans defaults="header.turn.pass" components={[<PlayMoveButton move={passMove}/>]}/>
  }
}

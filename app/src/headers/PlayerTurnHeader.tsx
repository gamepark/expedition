/** @jsxImportSource @emotion/react */
import { getPlayerName } from '@gamepark/expedition/ExpeditionOptions'
import { Trans, useTranslation } from 'react-i18next'
import { isDeleteItem, isEndGame, isMoveItem, isStartPlayerTurn, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { PlayMoveButton, useGame, useLegalMoves, usePlayerName } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'

export const PlayerTurnHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<Color, MaterialType, LocationType>>()!
  const legalMoves = useLegalMoves<MaterialMove>()
  const playerName = usePlayerName(game.rule!.player!) || getPlayerName(game.rule!.player!, t)
  if (!legalMoves.length) {
    return <>{t('header.turn', { player: playerName })}</>
  }
  const passMove = legalMoves.find(move => isStartPlayerTurn(move) || isEndGame(move))
  const playTicket = legalMoves.find(move => isDeleteItem(move, MaterialType.Ticket))
  const canPlaceArrow = legalMoves.some(move => isMoveItem(move, MaterialType.Arrow))
  if (!passMove) {
    if (playTicket) {
      return <Trans defaults="header.turn.arrowTicket" components={[<PlayMoveButton move={playTicket}/>]}/>
    } else {
      return <>{t('header.turn.arrow')}</>
    }
  } else if (canPlaceArrow) {
    if (playTicket) {
      return <Trans defaults="header.turn.extraArrowTicket" components={[<PlayMoveButton move={playTicket}/>, <PlayMoveButton move={passMove}/>]}/>
    } else {
      return <Trans defaults="header.turn.extraArrow" components={[<PlayMoveButton move={passMove}/>]}/>
    }
  } else if (playTicket) {
    return <Trans defaults="header.turn.ticket"
                  components={[<PlayMoveButton move={playTicket}/>, <PlayMoveButton move={passMove}/>]}/>
  } else {
    return <Trans defaults="header.turn.pass" components={[<PlayMoveButton move={passMove}/>]}/>
  }
}

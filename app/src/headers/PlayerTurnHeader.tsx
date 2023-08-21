/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { isDeleteItemType, isEndGame, isMoveItemType, isStartPlayerTurn, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { PlayMoveButton, useGame, useLegalMoves, usePlayerName } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { LocationType } from '@gamepark/expedition/material/LocationType'

export const PlayerTurnHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<Color, MaterialType, LocationType>>()!
  const legalMoves = useLegalMoves<MaterialMove>()
  const playerName = usePlayerName(game.rule!.player!)
  if (!legalMoves.length) {
    return <>{t('header.turn', { player: playerName })}</>
  }
  const passMove = legalMoves.find(move => isStartPlayerTurn(move) || isEndGame(move))
  const playTicket = legalMoves.find(isDeleteItemType(MaterialType.Ticket))
  const canPlaceArrow = legalMoves.some(isMoveItemType(MaterialType.Arrow))
  if (!passMove) {
    if (playTicket) {
      return <Trans defaults="header.turn.arrowTicket"><PlayMoveButton move={playTicket}/></Trans>
    } else {
      return <>{t('header.turn.arrow')}</>
    }
  } else if (canPlaceArrow) {
    if (playTicket) {
      return (
        <Trans defaults="header.turn.extraArrowTicket">
          <PlayMoveButton move={playTicket}/>
          <PlayMoveButton move={passMove} confirmation={{ text: t('header.turn.confirm-pass')! }}/>
        </Trans>
      )
    } else {
      return <Trans defaults="header.turn.extraArrow"><PlayMoveButton move={passMove} confirmation={{ text: t('header.turn.confirm-pass')! }}/></Trans>
    }
  } else if (playTicket) {
    return (
      <Trans defaults="header.turn.ticket">
        <PlayMoveButton move={playTicket}/>
        <PlayMoveButton move={passMove}/>
      </Trans>
    )
  } else {
    return <Trans defaults="header.turn.pass"><PlayMoveButton move={passMove}/></Trans>
  }
}

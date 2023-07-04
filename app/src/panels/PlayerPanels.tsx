/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { usePlayerId, useRules } from '@gamepark/react-game'
import { css } from '@emotion/react'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { ExpeditionPlayerPanel } from './ExpeditionPlayerPanel'
import { PlayerDialog } from './dialog/PlayerDialog'
import Color from '@gamepark/expedition/Color'

export const PlayerPanels = () => {
  const [playerDialog, setPlayerDialog] = useState<Color | undefined>()
  const playerId = usePlayerId()
  const rules = useRules<ExpeditionRules>()
  const players = rules?.players ?? []
  const playerIndex = players.indexOf(playerId)
  const playersOrdered = playerIndex > 0 ? players.slice(playerIndex).concat(players.slice(0, playerIndex)) : players

  return (
    <>
      {playersOrdered.map((player, index) =>
        <ExpeditionPlayerPanel
          key={player}
          player={player}
          index={index}
          onClick={() => setPlayerDialog(player)}
          css={panelPosition(index, players.length, playerId)}/>
      )}
      {!!playerDialog && <PlayerDialog open={!!playerDialog} player={playerDialog!} close={() => setPlayerDialog(undefined)}/>}
    </>
  )
}

const panelPosition = (index: number, players: number, player: Color) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + (player === undefined ? index : (index || players) - 1) * 76.5 / (players - 1)}em;
  width: 28em;
  height: 14em;
  cursor: pointer;
`


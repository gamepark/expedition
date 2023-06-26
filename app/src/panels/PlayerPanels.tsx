/** @jsxImportSource @emotion/react */
import { FC, useState } from 'react'
import { usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { css } from '@emotion/react'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { ExpeditionPlayerPanel } from './ExpeditionPlayerPanel'
import { PlayerDialog } from './dialog/PlayerDialog'
import Player from '@gamepark/expedition/Player'

const PlayerPanels: FC<any> = () => {
  const [playerDialog, setPlayerDialog] = useState<Player | undefined>()
  const players = usePlayers({ sortFromMe: true })
  const isSpectator = usePlayerId() === undefined
  const rules = useRules<ExpeditionRules>()!

  return (
    <>
      {players.map((player, index) =>
        <ExpeditionPlayerPanel
          key={player.id}
          players={players}
          player={player}
          index={index}
          rules={rules}
          onClick={() => setPlayerDialog(player)}
          css={panelPosition(index, players.length, isSpectator)}/>
      )}
      {!!playerDialog && <PlayerDialog open={!!playerDialog} player={playerDialog!} rules={rules} close={() => setPlayerDialog(undefined)}/>}
    </>
  )
}

const panelPosition = (index: number, players: number, isSpectator: boolean) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + (isSpectator ? index : (index || players) - 1) * 76.5 / (players - 1)}em;
  width: 28em;
  height: 14em;
  cursor: pointer;
`

export { PlayerPanels }

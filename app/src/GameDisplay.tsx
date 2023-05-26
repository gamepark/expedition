/** @jsxImportSource @emotion/react */
import { GameTable, PlayerPanel, usePlayerId, usePlayers } from '@gamepark/react-game'
import { MaterialsDescription } from './material/MaterialsDescription'
import { Locators } from './locators/Locators'
import { playerColorCode } from './locators/PlaceLocator'
import { css } from '@emotion/react'

export const GameDisplay = () => {
  const players = usePlayers({ sortFromMe: true })
  const isSpectator = usePlayerId() === undefined
  return <>
    <GameTable material={MaterialsDescription} locators={Locators}
               xMin={-63} xMax={50} yMin={-34} yMax={34}
               zoomMin={1.4} zoomMax={5} margin={{ top: 7, left: 0, right: 20, bottom: 0 }}/>
    {players.map((player, index) =>
      <PlayerPanel key={player.id} playerId={player.id} color={playerColorCode[player.id]} css={panelPosition(index, players.length, isSpectator)}/>
    )}
  </>
}

const panelPosition = (index: number, players: number, isSpectator: boolean) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + (isSpectator ? index : (index || players) - 1) * 76.5 / (players - 1)}em;
  width: 25em;
  height: 14em;
`

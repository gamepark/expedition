import { css } from '@emotion/react'
import { DevToolsHub, GameTable, GameTableNavigation, usePlayerId } from '@gamepark/react-game'
import { LastTurnDialog } from './dialogs/LastTurnDialog'
import { PlayerPanels } from './panels/PlayerPanels'

export const GameDisplay = () => {
  const playerId = usePlayerId()
  return <>
    <GameTable xMin={-63} xMax={45} yMin={-34} yMax={34}
               margin={{ top: 7, left: 0, right: 30, bottom: 0 }}>
      <GameTableNavigation css={playerId ? navigationCss : spectatorNavCss}/>
      {process.env.NODE_ENV === 'development' && <DevToolsHub fabBottom="calc(1em + 6em * 1.7)" />}
    </GameTable>
    <PlayerPanels/>
    <LastTurnDialog/>
  </>
}

const navigationCss = css`
  top: auto;
  bottom: 1em;
  flex-direction: column;
  left: auto;
  right: 30em;
`

const spectatorNavCss = css`
  top: auto;
  left: 2em;
  bottom: 2em;
`

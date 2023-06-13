/** @jsxImportSource @emotion/react */
import { GameTable } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'
import { LastTurnDialog } from './dialogs/LastTurnDialog'

export const GameDisplay = () => {
  return <>
    <GameTable xMin={-63} xMax={50} yMin={-34} yMax={34}
               zoomMin={1.35} zoomMax={5} margin={{ top: 7, left: 0, right: 20, bottom: 0 }}/>
    <PlayerPanels/>
    <LastTurnDialog/>
  </>
}

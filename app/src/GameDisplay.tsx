import { DevToolsHub, GameTable } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'
import { LastTurnDialog } from './dialogs/LastTurnDialog'

export const GameDisplay = () => {
  return <>
    <GameTable xMin={-63} xMax={45} yMin={-34} yMax={34}
               margin={{ top: 7, left: 0, right: 30, bottom: 0 }}>
      {process.env.NODE_ENV === 'development' && <DevToolsHub fabBottom="calc(1em + 6em * 1.7)" />}
    </GameTable>
    <PlayerPanels/>
    <LastTurnDialog/>
  </>
}

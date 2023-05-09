/** @jsxImportSource @emotion/react */
import { GameTable } from '@gamepark/react-game'
import { MaterialsDescription } from './material/MaterialsDescription'
import { Locators } from './locators/Locators'

export const GameDisplay = () =>
  <GameTable material={MaterialsDescription} locators={Locators}
             xMin={-63} xMax={50} yMin={-34} yMax={34}
             zoomMin={1.4} zoomMax={5} margin={{ top: 7, left: 0, right: 20, bottom: 0 }}/>

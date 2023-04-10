/** @jsxImportSource @emotion/react */
import {GameTable} from '@gamepark/react-client'
import {MaterialsDescription} from './material/MaterialsDescription'
import {Locators} from './locators/Locators'

export const GameDisplay = () => <GameTable material={MaterialsDescription} locators={Locators} zoomMin={1.4} margin={{top: 7, left: 0, right: 20, bottom: 0}}/>

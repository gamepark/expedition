/** @jsxImportSource @emotion/react */
import {GameTable} from '@gamepark/react-components'
import {MaterialsDescription} from './material/MaterialsDescription'
import {MaterialGame} from '@gamepark/rules-api'
import {Locators} from './locators/Locators'
import {usePlayerId} from '@gamepark/react-client'

type Props = {
  game: MaterialGame
}

export default function GameDisplay({game}: Props) {
  const playerId = usePlayerId()
  return (
    <GameTable material={MaterialsDescription} locators={Locators} game={game} playerId={playerId} zoomMin={1.4}
               margin={{top: 7, left: 0, right: 20, bottom: 0}}>
    </GameTable>
  )
}

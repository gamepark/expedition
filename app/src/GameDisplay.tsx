/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
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
    <GameTable css={style} material={MaterialsDescription} locators={Locators} game={game} playerId={playerId} zoomMin={1.4}
               margin={{top: 7, left: 0, right: 20, bottom: 0}}>
    </GameTable>
  )
}

const fadeIn = keyframes`
  from, 50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const style = css`
  animation: ${fadeIn} 3s ease-in forwards;
`

/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import {GameTable} from '@gamepark/react-components'
import {MaterialsDescription} from './material/MaterialsDescription'
import {MaterialGame} from '../../../workshop/packages/rules-api'
import {LocationsDescription} from './material/LocationsDescription'

type Props = {
  game: MaterialGame
}

export default function GameDisplay({game}: Props) {
  return (
    <GameTable css={style} material={MaterialsDescription} location={LocationsDescription} items={game.items}>
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

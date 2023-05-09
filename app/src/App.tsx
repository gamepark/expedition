/** @jsxImportSource @emotion/react */
import { FailuresDialog, FullscreenDialog } from '@gamepark/react-client'
import { Header, LoadingScreen, Menu, useGame } from '@gamepark/react-game'
import { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd-multi-backend'
import HTML5ToTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'
import { GameDisplay } from './GameDisplay'
import HeaderText from './HeaderText'
import { MaterialGame } from '@gamepark/rules-api'

export default function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !game || isJustDisplayed
  return (
    <DndProvider options={HTML5ToTouch}>
      {!loading && <GameDisplay/>}
      <LoadingScreen display={loading} author="Someone" artist="Somebody" publisher="Nobody" developer="You"/>
      <Header><HeaderText loading={loading} game={game}/></Header>
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
    </DndProvider>
  )
}
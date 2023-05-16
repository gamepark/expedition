/** @jsxImportSource @emotion/react */
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialHeader, Menu, useGame } from '@gamepark/react-game'
import { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd-multi-backend'
import HTML5ToTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'
import { GameDisplay } from './GameDisplay'
import { MaterialGame } from '@gamepark/rules-api'
import { RulesStep } from '@gamepark/expedition/rules/RulesStep'
import { SetupKeyPlacesHeader } from './headers/SetupKeyPlacesHeader'
import { PlayerTurnHeader } from './headers/PlayerTurnHeader'
import { TicketEffectHeader } from './headers/TicketEffectHeader'
import { GameOverHeader } from './headers/GameOverHeader'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

export default function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 1000)
  }, [])
  const loading = !game || isJustDisplayed
  return (
    <DndProvider options={HTML5ToTouch}>
      {!loading && <GameDisplay/>}
      <LoadingScreen display={loading} author="Wolfgang Kramer" artist="Yann Valeani" publisher="Super Meeple" developer="Game Park"/>
      <MaterialHeader rulesStepsHeaders={RulesStepHeaders} GameOver={GameOverHeader}/>
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
    </DndProvider>
  )
}

const RulesStepHeaders: Record<RulesStep, () => ReactJSXElement> = {
  [RulesStep.SetupKeyPlaces]: SetupKeyPlacesHeader,
  [RulesStep.PlayerTurn]: PlayerTurnHeader,
  [RulesStep.TicketEffect]: TicketEffectHeader
}
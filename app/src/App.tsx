/** @jsxImportSource @emotion/react */
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialHeader, MaterialImageLoader, Menu, useGame } from '@gamepark/react-game'
import { useEffect, useState } from 'react'
import { GameDisplay } from './GameDisplay'
import { MaterialGame } from '@gamepark/rules-api'
import { RuleId } from '@gamepark/expedition/rules/RuleId'
import { SetupKeyPlacesHeader } from './headers/SetupKeyPlacesHeader'
import { PlayerTurnHeader } from './headers/PlayerTurnHeader'
import { TicketRuleHeader } from './headers/TicketRuleHeader'
import { GameOverHeader } from './headers/GameOverHeader'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { LoopRuleHeader } from './headers/LoopRuleHeader'
import { ChooseCardRuleHeader } from './headers/ChooseCardRuleHeader'
import { DiscardRuleHeader } from './headers/DiscardRuleHeader'

export default function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  const [isImagesLoading, setImagesLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 1000)
  }, [])
  const loading = !game || isJustDisplayed || isImagesLoading
  return (
    <>
      {!loading && <GameDisplay/>}
      <LoadingScreen display={loading} author="Wolfgang Kramer" artist="Yann Valeani" publisher="Super Meeple" developer="Game Park"/>
      <MaterialHeader rulesStepsHeaders={RulesHeaders} GameOver={GameOverHeader} loading={loading}/>
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)}/>
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
    </>
  )
}

const RulesHeaders: Record<RuleId, () => ReactJSXElement> = {
  [RuleId.SetupKeyPlaces]: SetupKeyPlacesHeader,
  [RuleId.PlayerTurn]: PlayerTurnHeader,
  [RuleId.LoopRule]: LoopRuleHeader,
  [RuleId.TicketRule]: TicketRuleHeader,
  [RuleId.ChooseCardRule]: ChooseCardRuleHeader,
  [RuleId.DiscardRule]: DiscardRuleHeader
}

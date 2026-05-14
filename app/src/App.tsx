import { RuleId } from '@gamepark/expedition/rules/RuleId'
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialGameSounds, MaterialHeader, MaterialImageLoader, Menu, useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { ComponentType, useEffect, useState } from 'react'
import { ChooseCardRuleHeader } from './headers/ChooseCardRuleHeader'
import { DiscardRuleHeader } from './headers/DiscardRuleHeader'
import { GameOverRule } from './headers/GameOverRule'
import { LoopRuleHeader } from './headers/LoopRuleHeader'
import { PlayerTurnHeader } from './headers/PlayerTurnHeader'
import { SetupKeyPlacesHeader } from './headers/SetupKeyPlacesHeader'
import { TicketRuleHeader } from './headers/TicketRuleHeader'
import { GameDisplay } from './GameDisplay'

export default function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  const [isImagesLoading, setImagesLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), process.env.NODE_ENV === 'development' ? 0 : 1000)
  }, [])
  const loading = !game || isJustDisplayed || isImagesLoading
  return (
    <>
      {!!game && <GameDisplay />}
      <LoadingScreen display={loading} />
      <MaterialHeader rulesStepsHeaders={RulesHeaders} GameOverRule={GameOverRule} loading={loading} />
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)} />
      <MaterialGameSounds />
      <Menu />
      <FailuresDialog />
      <FullscreenDialog />
    </>
  )
}

const RulesHeaders: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.SetupKeyPlaces]: SetupKeyPlacesHeader,
  [RuleId.PlayerTurn]: PlayerTurnHeader,
  [RuleId.LoopRule]: LoopRuleHeader,
  [RuleId.TicketRule]: TicketRuleHeader,
  [RuleId.ChooseCardRule]: ChooseCardRuleHeader,
  [RuleId.DiscardRule]: DiscardRuleHeader
}

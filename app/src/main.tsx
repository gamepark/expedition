import { ExpeditionOptionsSpecV2 } from '@gamepark/expedition/ExpeditionOptions'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { ExpeditionSetup } from '@gamepark/expedition/ExpeditionSetup'
import { GameProvider, MaterialGameAnimations } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Locators } from './locators/Locators'
import { material, materialI18n } from './material/Material'
import { expeditionTheme } from './theme'
import { Tutorial } from './tutorial/Tutorial'
import { ai } from './tutorial/TutorialAI'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="expedition"
      GameSetup={ExpeditionSetup}
      Rules={ExpeditionRules}
      optionsSpec={ExpeditionOptionsSpecV2}
      material={material}
      locators={Locators}
      animations={new MaterialGameAnimations()}
      tutorial={new Tutorial()}
      materialI18n={materialI18n}
      ai={ai}
      theme={expeditionTheme}
      version={2}
    >
      <App />
    </GameProvider>
  </StrictMode>
)

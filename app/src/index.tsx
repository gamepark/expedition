/** @jsxImportSource @emotion/react */
import { ExpeditionOptionsSpec } from '@gamepark/expedition/ExpeditionOptions'
import { ExpeditionSetup } from '@gamepark/expedition/ExpeditionSetup'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { GameProvider, MaterialGameAnimations, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import translations from './translations.json'
import { material, materialI18n } from './material/Material'
import { Locators } from './locators/Locators'
import { Tutorial } from './tutorial/Tutorial'
import { ai } from './tutorial/TutorialAI'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider game="expedition" GameSetup={ExpeditionSetup} Rules={ExpeditionRules} optionsSpec={ExpeditionOptionsSpec}
                  material={material} locators={Locators} animations={new MaterialGameAnimations()} tutorial={new Tutorial()}
                  materialI18n={materialI18n} ai={ai}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)

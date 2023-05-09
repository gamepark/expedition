/** @jsxImportSource @emotion/react */
import { linkButtonCss, PlayMoveButton } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import { displayMaterialRules } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'

export const BoardRules = () => {
  const { t } = useTranslation()
  return <>
    <h2>{t('rules.board.title')}</h2>
    <p>{t('rules.board.place.compass')}</p>
    <p>{t('rules.board.place.green')}</p>
    <p>{t('rules.board.place.blue')}</p>
    <p><Trans defaults="rules.board.place.red" components={[
      <PlayMoveButton css={linkButtonCss} move={displayMaterialRules(MaterialType.Ticket)} local/>
    ]}/></p>
    <p>{t('rules.board.road')}</p>
  </>
}

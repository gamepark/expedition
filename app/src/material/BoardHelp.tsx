/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { linkButtonCss, PlayMoveButton } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const BoardHelp = () => {
  const { t } = useTranslation()
  return <>
    <h2>{t('rules.board.title')}</h2>
    <p>{t('rules.board.place.compass')}</p>
    <p>{t('rules.board.place.green')}</p>
    <p>{t('rules.board.place.blue')}</p>
    <p>
      <Trans defaults="rules.board.place.red">
        <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.Ticket)} local/>
      </Trans>
    </p>
    <p>{t('rules.board.road')}</p>
  </>
}

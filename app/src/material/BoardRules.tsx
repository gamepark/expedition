import { linkButtonCss, PlayMoveButton } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp
import { MaterialType } from '@gamepark/expedition/material/MaterialType'

export const BoardRules = () => {
  const { t } = useTranslation()
  return <>
    <h2>{t('rules.board.title')}</h2>
    <p>{t('rules.board.place.compass')}</p>
    <p>{t('rules.board.place.green')}</p>
    <p>{t('rules.board.place.blue')}</p>
    <p>
      <Trans i18nKey="rules.board.place.red">
        <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.Ticket)} local/>
      </Trans>
    </p>
    <p>{t('rules.board.road')}</p>
  </>
}

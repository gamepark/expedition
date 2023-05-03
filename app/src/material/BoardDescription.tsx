/** @jsxImportSource @emotion/react */
import board from '../images/board.jpg'
import { BoardMaterialDescription, linkButtonCss, MaterialComponentType, PlayMoveButton } from '@gamepark/react-components'
import { TFunction } from 'i18next'
import { Trans } from 'react-i18next'
import { displayMaterialRules } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'

export const boardRatio = 2053 / 1554

export const BoardDescription: BoardMaterialDescription = {
  type: MaterialComponentType.Board,
  props: {
    image: board,
    height: 56,
    ratio: boardRatio
  },
  items: [{position: {x: -10, y: -5, z: 0}}],
  rules: (t: TFunction) => <>
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


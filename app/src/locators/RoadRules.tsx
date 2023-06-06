/** @jsxImportSource @emotion/react */
import { LocationRulesProps, MaterialComponent, PlayMoveButton, useRules } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { useTranslation } from 'react-i18next'
import { MoveItem } from '@gamepark/rules-api'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { css } from '@emotion/react'

export const RoadRules = ({ legalMoves, close }: LocationRulesProps<Color, MaterialType, LocationType>) => {
  const { t } = useTranslation()
  const rules = useRules<ExpeditionRules>()
  return <>
    <h2>{t('rules.road.title')}</h2>
    <p>{t('rules.board.road')}</p>
    {legalMoves.map(move => {
      const color = rules?.items(MaterialType.Arrow)[(move as MoveItem).itemIndex].id
      return (
        <p key={color}>
          <PlayMoveButton move={move} css={placeArrowButton} onPlay={close}>
            <MaterialComponent type={MaterialType.Arrow} itemId={color} css={buttonArrowCss}/>
            {t('rules.road.placeArrow', { color })}
          </PlayMoveButton>
        </p>
      )
    })}
  </>
}

const placeArrowButton = css`
  padding: 0.4em 0.4em 0.4em 5.5em;
`

const buttonArrowCss = css`
  position: absolute;
  transform: translate(-3.2em, -1.7em) rotate(90deg);
`

/** @jsxImportSource @emotion/react */
import { LocationRulesProps, MaterialComponent, PlayMoveButton } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/ExpeditionLocations'
import { useTranslation } from 'react-i18next'
import { useRules } from '@gamepark/react-client'
import { MoveItem } from '@gamepark/rules-api'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { ArrowsDescription } from '../material/ArrowsDescription'
import { css } from '@emotion/react'

export const RoadRules = ({ legalMoves }: LocationRulesProps<Color, MaterialType, LocationType>) => {
  const { t } = useTranslation()
  const rules = useRules<ExpeditionRules>()
  return <>
    <h2>{t('rules.road.title')}</h2>
    <p>{t('rules.board.road')}</p>
    {legalMoves.map(move => {
      const color = rules?.material(MaterialType.Arrow).items[(move as MoveItem).itemIndex].id
      return (
        <p>
          <PlayMoveButton move={move} css={placeArrowButton}>
            <MaterialComponent description={ArrowsDescription} itemId={color} css={buttonArrowCss}/>
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

/** @jsxImportSource @emotion/react */
import { MaterialComponent, PlayMoveButton, useLegalMoves, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { isMoveItem, MoveItem } from '@gamepark/rules-api'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { css } from '@emotion/react'
import { Road } from '@gamepark/expedition/material/Road'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import equal from 'fast-deep-equal'

type RoadMovesButtonsProps = {
  road: Road
  close: () => void
}

export const RoadMovesButtons = ({ road, close }: RoadMovesButtonsProps) => {
  const { t } = useTranslation()
  const rules = useRules<ExpeditionRules>()
  const legalMoves = useLegalMoves<MoveItem>(move => isMoveItem(move, MaterialType.Arrow)
    && move.position.location?.type === LocationType.Road && equal(move.position.location.id, road))
  return <>
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

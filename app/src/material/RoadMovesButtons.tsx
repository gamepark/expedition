/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { arrowRoad, Road } from '@gamepark/expedition/material/Road'
import { MaterialComponent, PlayMoveButton, useLegalMoves, useRules } from '@gamepark/react-game'
import { isMoveItemType, MoveItem } from '@gamepark/rules-api'
import equal from 'fast-deep-equal'
import { useTranslation } from 'react-i18next'
import { getPlaceTitle } from '../locators/PlaceRules'

type RoadMovesButtonsProps = {
  road: Road
  closeDialog: () => void
}

export const RoadMovesButtons = ({ road, closeDialog }: RoadMovesButtonsProps) => {
  const { t } = useTranslation()
  const rules = useRules<ExpeditionRules>()
  const legalMoves = useLegalMoves<MoveItem>(move => isMoveItemType(MaterialType.Arrow)(move)
    && move.location.type === LocationType.Road && equal(move.location.id, road))
  return <>
    {legalMoves.map(move => {
      const color = rules?.material(MaterialType.Arrow).getItem((move as MoveItem).itemIndex)?.id
      return (
        <p key={JSON.stringify(move)}>
          <PlayMoveButton move={move} css={placeArrowButton} onPlay={closeDialog}>
            <MaterialComponent type={MaterialType.Arrow} itemId={color} css={buttonArrowCss}/>
            {t('rules.place.arrow', { color, destination: getPlaceTitle(t, arrowRoad(move.location)[1]) })}
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

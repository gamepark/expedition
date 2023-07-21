/** @jsxImportSource @emotion/react */
import { MaterialComponent, PlayMoveButton, useLegalMoves, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { isMoveItemType, ItemPosition, MoveItem } from '@gamepark/rules-api'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { css } from '@emotion/react'
import { arrowRoad, Road } from '@gamepark/expedition/material/Road'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import equal from 'fast-deep-equal'
import { getPlaceTitle } from '../locators/PlaceRules'

type RoadMovesButtonsProps = {
  road: Road
  closeDialog: () => void
}

export const RoadMovesButtons = ({ road, closeDialog }: RoadMovesButtonsProps) => {
  const { t } = useTranslation()
  const rules = useRules<ExpeditionRules>()
  const legalMoves = useLegalMoves<MoveItem>(move => isMoveItemType(MaterialType.Arrow)(move)
    && move.position.location?.type === LocationType.Road && equal(move.position.location.id, road))
  return <>
    {legalMoves.map(move => {
      const color = rules?.items(MaterialType.Arrow)[(move as MoveItem).itemIndex].id
      return (
        <p key={JSON.stringify(move)}>
          <PlayMoveButton move={move} css={placeArrowButton} onPlay={closeDialog}>
            <MaterialComponent type={MaterialType.Arrow} itemId={color} css={buttonArrowCss}/>
            {t('rules.place.arrow', { color, destination: getPlaceTitle(t, arrowRoad(move.position as ItemPosition)[1]) })}
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

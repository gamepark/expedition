/** @jsxImportSource @emotion/react */
import { linkButtonCss, LocationRulesProps, MaterialComponent, PlayMoveButton } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/ExpeditionLocations'
import { Trans, useTranslation } from 'react-i18next'
import { isBlueNode, isGreenNode, isRedNode, isRoadToNode, Node } from '@gamepark/expedition/material/Road'
import { useLegalMoves, useRules } from '@gamepark/react-client'
import { TFunction } from 'i18next'
import { displayMaterialRules, isMoveItem, MaterialRulesMove, MoveItem } from '@gamepark/rules-api'
import { arrowColors } from '@gamepark/expedition/material/ArrowColor'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { ArrowsDescription } from '../material/ArrowsDescription'
import { css } from '@emotion/react'
import { Place } from '@gamepark/expedition/material/Place'

export const PlaceRules = ({ location }: LocationRulesProps<Color, MaterialType, LocationType>) => {
  const { t } = useTranslation()
  const rules = useRules<ExpeditionRules>()
  const legalMoves = useLegalMoves<MaterialRulesMove, MoveItem>(
    move => isMoveItem(move) && move.item.location !== undefined && isRoadToNode(location.id, move.item.location, move.item.rotation?.z === 1)
  )
  return <>
    <h2>{getPlaceTitle(t, location.id)}</h2>
    <p>{getPlaceText(t, location.id)}</p>
    {isGreenNode(location.id) && <GreenPlaceDetails place={location.id}/>}
    {legalMoves.length > 0 && arrowColors.map(color => {
      const move = legalMoves.find(move => rules?.material(MaterialType.Arrow).items[move.itemIndex].id === color)
      return move ?
        <p>
          <PlayMoveButton move={move} css={placeArrowButton}>
            <MaterialComponent description={ArrowsDescription} itemId={color} css={buttonArrowCss}/>
            {t('rules.place.arrow', { color })}
          </PlayMoveButton>
        </p>
        : null
    })}
  </>
}

const GreenPlaceDetails = ({ place }: { place: Place }) => {
  const { t } = useTranslation()
  const rules = useRules<ExpeditionRules>()
  const card = rules?.material(MaterialType.Card).items.find(card => card.id === place)
  switch (card?.location.type) {
    case LocationType.CommonPlacesArea:
      return <p>{t('rules.place.common')}</p>
    case LocationType.Hand:
      return <p>{t('rules.place.hand')}</p>
    default:
      return null
  }
}

const placeArrowButton = css`
  padding: 0.4em 0.4em 0.4em 5.5em;
`

const buttonArrowCss = css`
  position: absolute;
  transform: translate(-3.2em, -1.7em) rotate(90deg);
`

const getPlaceTitle = (t: TFunction, place: Node) => {
  if (isBlueNode(place)) return t('rules.place.blue.title')
  else if (isRedNode(place)) return t('rules.place.red.title')
  else if (isGreenNode(place)) return t(`place.${place}.name`)
  else return t('rules.place.compass.title')
}

const getPlaceText = (t: TFunction, place: Node) => {
  if (isBlueNode(place)) return t('rules.board.place.blue')
  else if (isRedNode(place)) return <Trans defaults="rules.board.place.red" components={[
    <PlayMoveButton css={linkButtonCss} move={displayMaterialRules(MaterialType.Ticket)} local/>
  ]}/>
  else if (isGreenNode(place)) return t('rules.board.place.green')
  else return t('rules.board.place.compass')
}

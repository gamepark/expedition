/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { arrowColors } from '@gamepark/expedition/material/ArrowColor'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { Place, places2StepsFromStart } from '@gamepark/expedition/material/Place'
import { isBlueNode, isGreenNode, isRedNode, isRoadToNode, Node, RedNode } from '@gamepark/expedition/material/Road'
import { RuleId } from '@gamepark/expedition/rules/RuleId'
import { linkButtonCss, LocationHelpProps, MaterialComponent, PlayMoveButton, useLegalMove, useLegalMoves, usePlayerId, useRules } from '@gamepark/react-game'
import { displayMaterialHelp, isMoveItemType, MaterialMove, MoveItem } from '@gamepark/rules-api'
import equal from 'fast-deep-equal'
import { TFunction } from 'i18next'
import { Trans, useTranslation } from 'react-i18next'

export const PlaceHelp = ({ location, closeDialog }: LocationHelpProps) => {
  const { t } = useTranslation()
  const player = usePlayerId()
  const rules = useRules<ExpeditionRules>()
  const placeToken = useLegalMove((move: MaterialMove) => isMoveItemType(MaterialType.Token)(move) && equal(move.location, location))
  const arrowMoves = useLegalMoves<MoveItem>(move =>
    isMoveItemType(MaterialType.Arrow)(move) && isRoadToNode(location.id, move.location)
  )
  return <>
    <h2>{getPlaceTitle(t, location.id)}</h2>
    <p>{getPlaceText(t, location.id)}</p>
    {(location.id === RedNode.CraterLake_NorthWest || location.id === RedNode.Teotihuacan_SouthWest || location.id === RedNode.RapaNui_South) &&
      <p>{t('rules.place.red.border')}</p>
    }
    {isGreenNode(location.id) && <GreenPlaceDetails place={location.id}/>}
    {placeToken &&
      <p>
        <PlayMoveButton move={placeToken} onPlay={closeDialog}>
          {t('rules.place.token')}
        </PlayMoveButton>
      </p>
    }
    {rules?.game.rule?.id === RuleId.SetupKeyPlaces && rules.game.rule.player === player && places2StepsFromStart.includes(location.id) &&
      <p>{t('rules.place.token.forbidden')}</p>
    }
    {arrowMoves.length > 0 && arrowColors.map(color => {
      const move = arrowMoves.find(move => rules?.material(MaterialType.Arrow).getItem(move.itemIndex)?.id === color)
      return move ?
        <p key={color}>
          <PlayMoveButton move={move} css={placeArrowButton} onPlay={closeDialog}>
            <MaterialComponent type={MaterialType.Arrow} itemId={color} css={buttonArrowCss}/>
            {t('rules.place.arrow', { color, destination: getPlaceTitle(t, location.id) })}
          </PlayMoveButton>
        </p>
        : null
    })}
  </>
}

const GreenPlaceDetails = ({ place }: { place: Place }) => {
  const { t } = useTranslation()
  const rules = useRules<ExpeditionRules>()
  const card = rules?.material(MaterialType.Card).id(place).getItem()
  switch (card?.location.type) {
    case LocationType.CommonObjectives:
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

export const getPlaceTitle = (t: TFunction, place: Node) => {
  if (isBlueNode(place)) return t('rules.place.blue.title')
  else if (isRedNode(place)) return t('rules.place.red.title')
  else if (isGreenNode(place)) return t(`place.${place}.name`)
  else return t('rules.place.compass.title')
}

const getPlaceText = (t: TFunction, place: Node) => {
  if (isBlueNode(place)) return t('rules.board.place.blue')
  else if (isRedNode(place)) return (
    <Trans defaults="rules.board.place.red">
      <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.Ticket)} local/>
    </Trans>
  )
  else if (isGreenNode(place)) return t('rules.board.place.green')
  else return t('rules.board.place.compass')
}

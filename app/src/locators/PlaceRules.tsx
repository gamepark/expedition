/** @jsxImportSource @emotion/react */
import { linkButtonCss, LocationRulesProps, MaterialComponent, PlayMoveButton, useLegalMove, useLegalMoves, usePlayerId, useRules } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { Trans, useTranslation } from 'react-i18next'
import { isBlueNode, isGreenNode, isRedNode, isRoadToNode, Node, RedNode } from '@gamepark/expedition/material/Road'
import { TFunction } from 'i18next'
import { displayMaterialRules, isMoveItem, isMoveItemLocation, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { arrowColors } from '@gamepark/expedition/material/ArrowColor'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { css } from '@emotion/react'
import { Place, places2StepsFromStart } from '@gamepark/expedition/material/Place'
import { RuleId } from '@gamepark/expedition/rules/RuleId'
import equal from 'fast-deep-equal'

export const PlaceRules = ({ location, closeDialog }: LocationRulesProps) => {
  const { t } = useTranslation()
  const player = usePlayerId()
  const rules = useRules<ExpeditionRules>()
  const placeToken = useLegalMove((move: MaterialMove) => isMoveItem(move, MaterialType.Token) && equal(move.position.location, location))
  const arrowMoves = useLegalMoves<MoveItem>(move =>
    isMoveItemLocation(move, MaterialType.Arrow) && isRoadToNode(location.id, move.position.location, move.position.rotation?.z === 1)
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
      const move = arrowMoves.find(move => rules?.items(MaterialType.Arrow)[move.itemIndex].id === color)
      return move ?
        <p key={color}>
          <PlayMoveButton move={move} css={placeArrowButton} onPlay={closeDialog}>
            <MaterialComponent type={MaterialType.Arrow} itemId={color} css={buttonArrowCss}/>
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

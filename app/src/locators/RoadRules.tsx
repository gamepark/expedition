/** @jsxImportSource @emotion/react */
import { LocationRulesProps } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { useTranslation } from 'react-i18next'
import { RoadMovesButtons } from '../material/RoadMovesButtons'

export const RoadRules = ({ location, close }: LocationRulesProps<Color, MaterialType, LocationType>) => {
  const { t } = useTranslation()
  return <>
    <h2>{t('rules.road.title')}</h2>
    <p>{t('rules.board.road')}</p>
    <RoadMovesButtons road={location.id} close={close}/>
  </>
}

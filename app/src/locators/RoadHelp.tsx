/** @jsxImportSource @emotion/react */
import { LocationHelpProps } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { RoadMovesButtons } from '../material/RoadMovesButtons'

export const RoadHelp = ({ location, closeDialog }: LocationHelpProps) => {
  const { t } = useTranslation()
  return <>
    <h2>{t('rules.road.title')}</h2>
    <p>{t('rules.board.road')}</p>
    <RoadMovesButtons road={location.id} closeDialog={closeDialog}/>
  </>
}

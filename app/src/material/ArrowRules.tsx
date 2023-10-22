/** @jsxImportSource @emotion/react */
import { MaterialRulesProps, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { ArrowColor } from '@gamepark/expedition/material/ArrowColor'
import { TFunction } from 'i18next'
import { Trans, useTranslation } from 'react-i18next'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { RoadMovesButtons } from './RoadMovesButtons'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'

export const ArrowRules = ({ item, itemIndex, closeDialog }: MaterialRulesProps) => {
  const { t } = useTranslation()
  const removeArrow = useLegalMove((move: MaterialMove) =>
    isMoveItemType(MaterialType.Arrow, itemIndex)(move) && move.location.type === LocationType.ArrowsStock
  )
  return <>
    <h2>{arrowTitle[item.id!](t)}</h2>
    {item.location?.type === LocationType.ArrowsStock && <p>{arrowStock[item.id!](t, item.quantity)}</p>}
    {removeArrow &&
      <PlayMoveButton move={removeArrow} onPlay={closeDialog}>
        {t('rules.arrow.remove')}
      </PlayMoveButton>
    }
    <hr/>
    <p><Trans defaults="rules.arrow.purpose"><strong/></Trans></p>
    {item.location?.type === LocationType.Road && <RoadMovesButtons road={item.location.id} closeDialog={closeDialog}/>}
  </>
}

const arrowTitle: Record<ArrowColor, (t: TFunction) => string> = {
  [ArrowColor.Yellow]: t => t('rules.arrow.title.yellow'),
  [ArrowColor.Blue]: t => t('rules.arrow.title.blue'),
  [ArrowColor.Red]: t => t('rules.arrow.title.red')
}

const arrowStock: Record<ArrowColor, (t: TFunction, stock: number) => string> = {
  [ArrowColor.Yellow]: (t, stock) => t('rules.arrow.stock.yellow', { stock }),
  [ArrowColor.Blue]: (t, stock) => t('rules.arrow.stock.blue', { stock }),
  [ArrowColor.Red]: (t, stock) => t('rules.arrow.stock.red', { stock })
}

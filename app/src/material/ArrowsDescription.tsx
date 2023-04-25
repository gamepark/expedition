import red from '../images/arrows/red-arrow.png'
import blue from '../images/arrows/blue-arrow.png'
import yellow from '../images/arrows/yellow-arrow.png'
import {MaterialComponentType, MaterialRulesContext, TokenMaterialDescription} from '@gamepark/react-components'
import {ArrowColor} from '@gamepark/expedition/material/ArrowColor'
import {TFunction} from 'i18next'
import {Trans} from 'react-i18next'
import {LocationType} from '@gamepark/expedition/material/ExpeditionLocations'

export const ArrowsDescription: TokenMaterialDescription<ArrowColor> = {
  type: MaterialComponentType.Token,
  props: {
    image: {
      [ArrowColor.Red]: red,
      [ArrowColor.Blue]: blue,
      [ArrowColor.Yellow]: yellow
    },
    height: 4.5,
    ratio: 135 / 500
  },
  rules: (t: TFunction, {item}: MaterialRulesContext) => {
    return <>
      <h2>{arrowTitle[item.id!](t)}</h2>
      {item.location.type === LocationType.ArrowsStock && <p>{arrowStock[item.id!](t, item.quantity)}</p>}
      {/* TODO: if this arrow can be removed using a ticket, add a button to play the ticket and a button to remove the arrow */}
      <hr/>
      <p><Trans defaults="rules.arrow.purpose" components={[<strong/>]}/></p>
    </>
  }
}

const arrowTitle: Record<ArrowColor, (t: TFunction) => string> = {
  [ArrowColor.Yellow]: t => t('rules.arrow.title.yellow'),
  [ArrowColor.Blue]: t => t('rules.arrow.title.blue'),
  [ArrowColor.Red]: t => t('rules.arrow.title.red')
}

const arrowStock: Record<ArrowColor, (t: TFunction, stock: number) => string> = {
  [ArrowColor.Yellow]: (t, stock) => t('rules.arrow.stock.yellow', {stock}),
  [ArrowColor.Blue]: (t, stock) => t('rules.arrow.stock.blue', {stock}),
  [ArrowColor.Red]: (t, stock) => t('rules.arrow.stock.red', {stock})
}

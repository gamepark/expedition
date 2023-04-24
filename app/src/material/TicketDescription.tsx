import ticket from '../images/ticket.jpg'
import {MaterialComponentType, MaterialRulesContext, TokenMaterialDescription} from '@gamepark/react-components'
import Color from '@gamepark/expedition/Color'
import {TFunction} from 'i18next'
import {getPlayerName} from '@gamepark/expedition/ExpeditionOptions'
import {PlayMoveButton} from '@gamepark/react-client'
import {Trans} from 'react-i18next'

export const TicketDescription: TokenMaterialDescription<Color> = {
  type: MaterialComponentType.Token,
  props: {
    image: ticket,
    height: 2,
    ratio: 325 / 200
  },
  rules: (t: TFunction, {item, player}: MaterialRulesContext) => {
    // TODO: stock component will result in tickets without a location
    const mine = player !== undefined && item.location.player === player
    return <>
      <h2>{t('rules.ticket.title')}</h2>
      {mine && <p>{t('rules.ticket.mine', {number: item.quantity})}</p>}
      {mine && <PlayMoveButton move={'TODO'}>{t('rules.ticket.spend')}</PlayMoveButton>}
      {!mine && <p>{t('rules.ticket.other', {number: item.quantity, player: getPlayerName(item.location.player!, t)})}</p>}
      <p><Trans defaults="rules.ticket.purpose" components={[<strong/>]}/></p>
    </>
  }
}
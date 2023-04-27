/** @jsxImportSource @emotion/react */
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
  rules: (t: TFunction, {item, player, legalMoves}: MaterialRulesContext) => {
    const owner = item.location?.player
    const mine = owner !== undefined && owner === player
    return <>
      <h2>{t('rules.ticket.title')}</h2>
      {mine && <p>{t('rules.ticket.mine', {number: item.quantity})}</p>}
      {mine && legalMoves.length === 1 && <PlayMoveButton move={legalMoves[0]}>{t('rules.ticket.spend')}</PlayMoveButton>}
      {owner !== undefined && !mine && <p>{t('rules.ticket.other', {number: item.quantity, player: getPlayerName(owner, t)})}</p>}
      <hr/>
      <p><Trans defaults="rules.ticket.purpose" components={[<strong/>]}/></p>
    </>
  }
}
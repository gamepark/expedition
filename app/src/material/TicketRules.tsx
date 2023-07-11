/** @jsxImportSource @emotion/react */
import { MaterialRulesProps, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { Trans, useTranslation } from 'react-i18next'
import { isDeleteItem, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'

export const TicketRules = ({ item, itemIndex, closeDialog }: MaterialRulesProps) => {
  const { t } = useTranslation()
  const legalMove = useLegalMove((move: MaterialMove) => isDeleteItem(move, MaterialType.Ticket, itemIndex))
  const player = usePlayerId<Color>()
  const owner = item.location?.player
  const mine = owner !== undefined && owner === player
  const playerName = usePlayerName(owner)
  return <>
    <h2>{t('rules.ticket.title')}</h2>
    {mine && <p>{t('rules.ticket.mine', { number: item.quantity })}</p>}
    {legalMove &&
      <PlayMoveButton move={legalMove} onPlay={closeDialog}>
        {t('rules.ticket.spend')}
      </PlayMoveButton>
    }
    {owner !== undefined && !mine &&
      <p>{t('rules.ticket.other', { number: item.quantity, player: playerName })}</p>}
    <hr/>
    <p><Trans defaults="rules.ticket.purpose" components={[<strong/>]}/></p>
  </>
}

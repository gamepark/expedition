/** @jsxImportSource @emotion/react */
import { MaterialRulesProps, PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { getPlayerName } from '@gamepark/expedition/ExpeditionOptions'
import { Trans, useTranslation } from 'react-i18next'

export const TicketRules = ({ item, legalMoves, close }: MaterialRulesProps) => {
  const { t } = useTranslation()
  const player = usePlayerId<Color>()
  const owner = item.location?.player
  const mine = owner !== undefined && owner === player
  const playerName = owner ? usePlayerName(owner) ?? getPlayerName(owner!, t) : ''
  return <>
    <h2>{t('rules.ticket.title')}</h2>
    {mine && <p>{t('rules.ticket.mine', { number: item.quantity })}</p>}
    {mine && legalMoves.length === 1 &&
      <PlayMoveButton move={legalMoves[0]} onPlay={close}>
        {t('rules.ticket.spend')}
      </PlayMoveButton>
    }
    {owner !== undefined && !mine &&
      <p>{t('rules.ticket.other', { number: item.quantity, player: playerName })}</p>}
    <hr/>
    <p><Trans defaults="rules.ticket.purpose" components={[<strong/>]}/></p>
  </>
}

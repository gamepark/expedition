/** @jsxImportSource @emotion/react */
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { FC } from 'react'
import { Avatar, RulesDialog, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { css } from '@emotion/react'
import { getPlayerName } from '@gamepark/expedition/ExpeditionOptions'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { ticketDescription } from '../../material/TicketDescription'
import ticket from '../../images/ticket.jpg'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import hand from '../../images/icons/hand.png'
import { playerTokensDescription } from '../../material/PlayerTokenDescription'
import { PlayerDialogIndicator } from './PlayerDialogIndicator'
import { countPlayerTickets } from '../ExpeditionPlayerPanel'
import Color from '@gamepark/expedition/Color'

type PlayerDialogProps = {
  player: Color
  close: () => void
  open: boolean
}

export const PlayerDialog: FC<PlayerDialogProps> = ({ close, player }) => {
  const { t } = useTranslation()
  const rules = useRules<ExpeditionRules>()!
  const name = usePlayerName(player) ?? getPlayerName(player, t)
  return (
    <RulesDialog open close={close}>
      <div css={container}>
        <div css={header}>
          <Avatar playerId={player} css={avatar}/>
          <h2>{name}</h2>
        </div>
        <div css={content}>
          <PlayerDialogIndicator
            width={3}
            icon={faStar}
            value={t('player.dialog.score.value', { player: name, score: rules.getScore(player) })}
            description={t('player.dialog.score.details', {
              bonus: rules.getCardsDone(player) + rules.getTokensOnCards(player),
              malus: rules.getCardsInHand(player) + rules.getTokensOnBoard(player)
            })}/>
          <PlayerDialogIndicator
            ratio={ticketDescription.width / ticketDescription.height}
            width={3}
            image={ticket}
            value={t('player.dialog.ticket.value', {
              player: name,
              tickets: rules ? countPlayerTickets(rules, player) : 0
            })}
            shadow
          />
          <PlayerDialogIndicator
            image={hand}
            width={3}
            value={t('player.dialog.card.value', {
              player: name,
              cards: rules?.material(MaterialType.Card).location(LocationType.Hand).player(player).length
            })}
            shadow
          />
          <PlayerDialogIndicator
            image={playerTokensDescription.images[player]}
            width={3}
            radius={3}
            value={t('player.dialog.token.value', {
              player: name,
              tokens: rules?.material(MaterialType.Token).location(LocationType.Place).id(player).length
            })}
            shadow
          />

        </div>
      </div>
    </RulesDialog>
  )
}

const container = css`
  padding: 3em;
  max-width: 90vw;
  max-height: 90vh;
`

const header = css`
  display: flex;
  margin: 0 0.7em 0 0.7em;
  padding-bottom: 1em;
  font-size: 3em;
  border-bottom: 0.1em solid lightgray;

  > h2 {
    margin: 0 0.7em;
    text-align: center;
    line-height: 1.3;
  }
`

const avatar = css`
  position: relative;
  border-radius: 100%;
  height: 3em;
  width: 3em;

  > svg {
    width: 112.3%;
    height: 117%;
  }
`

const content = css`
  margin: 0 0.7em 0 0.7em;
  font-size: 3em;

  > p {
    white-space: break-spaces;
  }
`

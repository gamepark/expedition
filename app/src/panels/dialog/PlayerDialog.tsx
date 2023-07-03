/** @jsxImportSource @emotion/react */
import Player from '@gamepark/expedition/Player'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { FC } from 'react'
import { Avatar, RulesDialog, usePlayer } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { css } from '@emotion/react'
import { getPlayerName } from '@gamepark/expedition/ExpeditionOptions'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { ticketDescription } from '../../material/TicketDescription'
import ticket from '../../images/ticket.jpg'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import hand from '../../images/icons/hand.png'
import { playerTokensDescription } from '../../material/PlayerTokenDescription'
import { PlayerDialogIndicator } from './PlayerDialogIndicator'
import { countPlayerTickets } from '../ExpeditionPlayerPanel'

type PlayerDialogProps = {
  player: Player
  rules: ExpeditionRules
  close: () => void;
  open: boolean;
}

const PlayerDialog: FC<PlayerDialogProps> = (props) => {
  const { close, player, rules } = props
  const { t } = useTranslation()
  const playerInfo = usePlayer(player.id)
  const name = playerInfo?.name ?? getPlayerName(player.id, t)
  return (
    <RulesDialog open close={close}>
      <div css={container}>
        <div css={header}>
          <Avatar playerId={player.id} css={avatar}/>
          <h2>{name}</h2>
        </div>
        <div css={content}>
          <PlayerDialogIndicator
            width={3}
            icon={faStar}
            value={t('player.dialog.score.value', {
              player: name,
              score: rules.getScore(player.id)
            })}/>
          <PlayerDialogIndicator
            ratio={ticketDescription.width / ticketDescription.height}
            width={3}
            image={ticket}
            value={t('player.dialog.ticket.value', {
              player: name,
              tickets: countPlayerTickets(rules, player.id)
            })}
            shadow
          />
          <PlayerDialogIndicator
            image={hand}
            width={3}
            value={t('player.dialog.card.value', {
              player: name,
              cards: rules.material(MaterialType.Card).location(LocationType.Hand).player(player.id).length
            })}
            shadow
          />
          <PlayerDialogIndicator
            image={playerTokensDescription.images[player.id]}
            width={3}
            radius={3}
            value={t('player.dialog.token.value', {
              player: name,
              tokens: rules.material(MaterialType.Token).location(LocationType.Place).id(player.id).length
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

export {
  PlayerDialog
}

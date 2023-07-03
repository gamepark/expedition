/** @jsxImportSource @emotion/react */
import { FC, HTMLAttributes } from 'react'
import { playerColorCode } from '../locators/PlaceLocator'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { ticketDescription } from '../material/TicketDescription'
import ticket from '../images/ticket.jpg'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import hand from '../images/icons/hand.png'
import { playerTokensDescription } from '../material/PlayerTokenDescription'
import { css } from '@emotion/react'
import { PlayerPanel, useRules } from '@gamepark/react-game'
import { PlayerPanelCounter } from './PlayerPanelCounter'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import Color from '@gamepark/expedition/Color'


type ExpeditionPlayerPanelProps = {
  player: Color
  index: number
} & HTMLAttributes<HTMLDivElement>

export const ExpeditionPlayerPanel: FC<ExpeditionPlayerPanelProps> = ({ index, player, ...props }) => {
  const rules = useRules<ExpeditionRules>()
  return (
    <PlayerPanel playerId={player} color={playerColorCode[player]}  {...props}>
      <div css={indicators}>
        <PlayerPanelCounter
          width={3}
          icon={faStar}
          value={rules?.getScore(player)!}/>
        <PlayerPanelCounter
          ratio={ticketDescription.width / ticketDescription.height}
          image={ticket}
          value={rules ? countPlayerTickets(rules, player) : 0}
          shadow
        />
        <PlayerPanelCounter
          image={hand}
          value={rules?.material(MaterialType.Card).location(LocationType.Hand).player(player).length!}
        />
        <PlayerPanelCounter
          image={playerTokensDescription.images[player]}
          width={2.8}
          borderRadius={3}
          value={rules?.material(MaterialType.Token).location(LocationType.Place).id(player).length!}
          shadow
        />
      </div>
    </PlayerPanel>
  )
}

export const countPlayerTickets = (rules: ExpeditionRules, player: Color) => {
  const tickets = rules.material(MaterialType.Ticket).player(player).getItem()
  return tickets ? tickets.quantity ?? 1 : 0
}

const indicators = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 1em;
  right: 0;
  justify-content: space-evenly;
  flex-wrap: wrap;
`

import { FC, HTMLAttributes } from 'react'
import { playerColorCode } from '../locators/PlaceDescription'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { ticketDescription } from '../material/TicketDescription'
import ticket from '../images/ticket.jpg'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import hand from '../images/icons/hand.png'
import { playerTokensDescription } from '../material/PlayerTokenDescription'
import { css, Interpolation, Theme } from '@emotion/react'
import { PlayerPanel, useRules } from '@gamepark/react-game'
import { PlayerPanelCounter } from './PlayerPanelCounter'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import Color from '@gamepark/expedition/Color'


type ExpeditionPlayerPanelProps = {
  player: Color
  index: number
  css?: Interpolation<Theme>
} & HTMLAttributes<HTMLDivElement>

export const ExpeditionPlayerPanel: FC<ExpeditionPlayerPanelProps> = ({ index, player, css: extraCss, ...props }) => {
  const rules = useRules<ExpeditionRules>()
  return (
    <PlayerPanel playerId={player} color={playerColorCode[player]} css={[panelCss(player), extraCss]} {...props}>
      <div css={indicators(player)}>
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

const playerGradients: Record<Color, string> = {
  [Color.Red]: 'linear-gradient(135deg, #E75035 0%, #781E14 100%)',
  [Color.Pink]: 'linear-gradient(135deg, #F19FC5 0%, #963C69 100%)',
  [Color.Blue]: 'linear-gradient(135deg, #21BBEF 0%, #0F5082 100%)',
  [Color.Green]: 'linear-gradient(135deg, #AFCB54 0%, #507323 100%)',
  [Color.Yellow]: 'linear-gradient(135deg, #FED061 0%, #A0731E 100%)',
  [Color.White]: 'linear-gradient(135deg, #FFFAEB 0%, #BEAF91 100%)'
}

// The panels use a 135° light→dark gradient: the name / timer / score (top-left) sit on the
// *light* end, while the counters (bottom) sit on the *dark* end. A single text colour can't be
// readable on both, so the base colour is dark (for the top region) and the counters override to
// cream — except White, whose gradient is light all the way through and needs dark text everywhere.
const darkText = '#241a0d'
const creamText = '#f4ead2'

const counterTextColor: Record<Color, string> = {
  [Color.Red]: creamText,
  [Color.Pink]: creamText,
  [Color.Blue]: creamText,
  [Color.Green]: creamText,
  [Color.Yellow]: creamText,
  [Color.White]: darkText
}

const panelCss = (player: Color) => css`
  background: ${playerGradients[player]};
  border: 0.15em solid ${playerColorCode[player]};
  border-radius: 1em;
  box-shadow:
    0 0.25em 0.6em rgba(0, 0, 0, 0.45),
    inset 0 0.05em 0 rgba(255, 250, 235, 0.18);
  color: ${darkText};

  h2 {
    text-shadow: 0 0.02em 0.1em rgba(255, 250, 235, 0.35);
  }
`

export const countPlayerTickets = (rules: ExpeditionRules, player: Color) => {
  const tickets = rules.material(MaterialType.Ticket).player(player).getItem()
  return tickets ? tickets.quantity ?? 1 : 0
}

const indicators = (player: Color) => css`
  width: 100%;
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 1em;
  right: 0;
  justify-content: space-evenly;
  flex-wrap: wrap;
  color: ${counterTextColor[player]};
`

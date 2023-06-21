/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { PlayerPanel, shadowCss, usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { playerColorCode } from '../locators/PlaceLocator'
// TODO: hand must be included in image loader
import hand from '../images/icons/hand.png'
import ticket from '../images/ticket.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { css } from '@emotion/react'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Material } from '../material/Material'
import { TicketDescription } from '../material/TicketDescription'
import { TokensDescription } from '../material/TokensDescription'

type PlayerPanelCounterProps = {
  icon?: IconProp;
  image?: any;
  ratio?: number;
  width?: number;
  value: number;
  shadow?: boolean;
  borderRadius?: number
}

const PlayerPanelCounter: FC<PlayerPanelCounterProps> = (props) => {
  const { icon, image, ratio = 1, width = iconWidth, value, shadow, borderRadius } = props
  return (
    <div css={indicator}>
      <div
        css={[iconStyle(ratio, width), !!image && iconImageStyle(image, borderRadius), !!image && shadow && shadowCss(image)]}>
        {!!icon && <FontAwesomeIcon icon={faStar} css={fontIcon} fill="#28B8CE"/>}
      </div>
      <div css={counter}>
        {value}
      </div>
    </div>
  )
}

const ticketDescription = Material[MaterialType.Ticket] as TicketDescription
const tokenDescription = Material[MaterialType.Token] as TokensDescription
const PlayerPanels: FC<any> = () => {
  const players = usePlayers({ sortFromMe: true })
  const isSpectator = usePlayerId() === undefined
  const rules = useRules<ExpeditionRules>()

  return (
    <>
      {players.map((player, index) =>
        <PlayerPanel key={player.id} playerId={player.id} color={playerColorCode[player.id]} css={panelPosition(index, players.length, isSpectator)}>
          <div css={indicators}>
            <PlayerPanelCounter
              width={3}
              icon={faStar}
              value={rules?.getScore(player.id)!}/>
            <PlayerPanelCounter
              ratio={ticketDescription.props.ratio as number}
              image={ticket}
              value={rules?.material(MaterialType.Ticket).location(LocationType.PlayerArea).player(player.id).length!}
              shadow
            />
            <PlayerPanelCounter
              image={hand}
              value={rules?.material(MaterialType.Card).location(LocationType.Hand).player(player.id).length!}
            />
            <PlayerPanelCounter
              ratio={tokenDescription.props.ratio as number}
              image={tokenDescription.props.image[player.id]}
              width={2.8}
              borderRadius={3}
              value={rules?.material(MaterialType.Token).location(LocationType.Place).id(player.id).length!}
              shadow
            />
          </div>
        </PlayerPanel>
      )}
    </>
  )
}

const indicator = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const counter = css`
  font-size: 2em;
  padding-left: 0.2em;
`

const iconWidth = 3.3
const iconStyle = (ratio: number = 1, width: number = iconWidth) => css`
  width: ${width}em;
  height: ${width / ratio}em;
`

const iconImageStyle = (image: any, borderRadius: number = 0) => css`
  background-position: center center;
  border-radius: ${borderRadius}em;
  background-image: url(${image});
  background-size: cover;
`

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

const panelPosition = (index: number, players: number, isSpectator: boolean) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + (isSpectator ? index : (index || players) - 1) * 76.5 / (players - 1)}em;
  width: 28em;
  height: 14em;
`

const fontIcon = css`font-size: 2.8em;
  color: #28B8CE`

export { PlayerPanels }

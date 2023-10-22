/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Color from '@gamepark/expedition/Color'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { Place, places2StepsFromStart } from '@gamepark/expedition/material/Place'
import { CustomMoveType } from '@gamepark/expedition/rules/CustomMoveType'
import { RuleId } from '@gamepark/expedition/rules/RuleId'
import { MaterialRulesProps, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { Trans, useTranslation } from 'react-i18next'

export const CardRules = (props: MaterialRulesProps) => {
  const { item, itemIndex, closeDialog } = props
  const { t } = useTranslation()
  const rules = useRules<ExpeditionRules>()!
  const discard = useLegalMove((move: MaterialMove) =>
    isMoveItemType(MaterialType.Card, itemIndex)(move) && move.location.type === LocationType.Deck
  )
  const draw = useLegalMove(isCustomMoveType(CustomMoveType.ExchangeCard))
  const player = usePlayerId<Color>()
  const deck = item.location?.type === LocationType.Deck
  const hand = item.location?.type === LocationType.Hand
  const common = item.location?.type === LocationType.CommonObjectives
  const scored = item.location?.type === LocationType.PlayerArea
  const playerName = usePlayerName(item.location!.player!)
  const country = getCountry(item.id, t)
  const continent = getContinent(item.id, t)
  return <>
    <h2>{t('rules.card.title')}</h2>
    <p>{t('rules.card.purpose')}</p>
    {deck && <p>{t('rules.card.deck', { number: rules.material(MaterialType.Card).location(LocationType.Deck).length })}</p>}
    {hand && <HandCardRules {...props}/>}
    {common && <p>{t('rules.card.common')}</p>}
    {scored && item.location?.player === player && <p>{t('rules.card.scored')}</p>}
    {scored && item.location?.player !== player && <p>{t('rules.card.scored.other', { player: playerName })}</p>}
    {draw && <PlayMoveButton move={draw} onPlay={closeDialog}>{t('rules.card.draw')}</PlayMoveButton>}
    {discard && <PlayMoveButton move={discard} onPlay={closeDialog}>{t('rules.card.discard')}</PlayMoveButton>}
    <hr/>
    {item.id !== undefined &&
      <section css={cardText}>
        <h3>{t(`place.${item.id}.name`)}</h3>
        {(country || continent) && <p>
          <em>
            {country && <strong>{country}</strong>}
            {country && continent && <span> - </span>}
            {continent}
          </em>
        </p>}
        <p>{t(`place.${item.id}.text`)}</p>
      </section>
    }
  </>
}

const HandCardRules = ({ item, closeDialog }: MaterialRulesProps) => {
  const { t } = useTranslation()
  const player = usePlayerId<Color>()
  const rules = useRules<ExpeditionRules>()!
  const mine = player !== undefined && item.location?.player === player
  const placeTokenMove = useLegalMove<MoveItem>(move => isMoveItemType(MaterialType.Token)(move) && move.location.id === item.id)
  const tokens = rules.material(MaterialType.Token)
  const isRevealed = mine && tokens.location(LocationType.Place).locationId(item.id).length > 0
  const playerName = usePlayerName(item.location!.player!)
  return <>
    {mine && !isRevealed && <p>{t('rules.card.hand.private')}</p>}
    {mine && isRevealed && <p>{t('rules.card.hand.revealed')}</p>}
    {placeTokenMove &&
      <Trans defaults="rules.card.hand.place.token">
        <PlayMoveButton move={placeTokenMove} onPlay={closeDialog}/>
      </Trans>
    }
    {rules.game.rule?.id === RuleId.SetupKeyPlaces && rules.game.rule.player === player && places2StepsFromStart.includes(item.id) &&
      <p>{t('rules.place.token.forbidden')}</p>
    }
    {!mine && <p>{t('rules.card.hand.other', { player: playerName })}</p>}
  </>
}

const cardText = css`
  h3, p {
    margin: 0.3em 0;
  }
`

const getCountry = (place: Place, t: TFunction): string => {
  switch (place) {
    case Place.Denali:
    case Place.CraterLake:
    case Place.OldFaithful:
    case Place.PuertoRico:
    case Place.GrandCanyon:
    case Place.Louisiane:
      return t('place.usa')
    case Place.MackenzieDelta:
    case Place.Banff:
    case Place.Newfoundland:
      return t('place.canada')
    case Place.NorthwestPassage:
      return t('place.arctic-ocean')
    case Place.NiagaraFalls:
      return t('place.canada-usa')
    case Place.Teotihuacan:
      return t('place.mexico')
    case Place.Tikal:
      return t('place.guatemala')
    case Place.SaltoAngel:
      return t('place.venezuela')
    case Place.Marajo:
    case Place.Aripuana:
    case Place.SalvadorDeBahia:
      return t('place.brazil')
    case Place.AmazonRainforest:
      return t('place.amazon')
    case Place.MachuPicchu:
      return t('place.peru')
    case Place.Altiplano:
      return t('place.bolivia')
    case Place.IguazuFalls:
      return t('place.argentina-brazil')
    case Place.Atacama:
      return t('place.chile-peru')
    case Place.GalapagosIslands:
      return t('place.ecuador')
    case Place.RapaNui:
      return t('place.chile')
    case Place.TierraDelFuego:
      return t('place.argentina-chile')
    case Place.GrahamLand:
      return t('place.antartic')
    case Place.Svalbard:
      return t('place.norway')
    case Place.Thingvellir:
      return t('place.iceland')
    case Place.Stonehenge:
      return t('place.uk')
    case Place.Rome:
      return t('place.italy')
    case Place.Athens:
      return t('place.greece')
    case Place.Timgad:
      return t('place.algeria')
    case Place.CanaryIslands:
      return t('place.spain')
    case Place.Giza:
      return t('place.egypt')
    case Place.Timbuktu:
      return t('place.mali')
    case Place.Kush:
      return t('place.sudan-egypt')
    case Place.Aksum:
      return t('place.ethiopa')
    case Place.Elmina:
      return t('place.ghana')
    case Place.Douala:
      return t('place.cameroon')
    case Place.Virunga:
      return t('place.congo')
    case Place.VictoriaFalls:
      return t('place.zambia')
    case Place.Omatako:
      return t('place.namibia')
    case Place.Petra:
      return t('place.jordan')
    case Place.Babylone:
      return t('place.iraq')
    case Place.Persepolis:
      return t('place.iran')
    case Place.Sanaa:
      return t('place.yemen')
    case Place.Zagorsk:
    case Place.PutoranaPlateau:
    case Place.Novossibirsk:
    case Place.Sakha:
    case Place.LakeBaikal:
    case Place.Kolyma:
      return t('place.russia')
    case Place.Harappa:
      return t('place.pakistan')
    case Place.GreatWall:
    case Place.Xian:
      return t('place.china')
    case Place.MountEverest:
      return t('place.nepal-china')
    case Place.TajMahal:
      return t('place.india')
    case Place.Sigiriya:
      return t('place.sri-lanka')
    case Place.Bagan:
      return t('place.myanmar')
    case Place.AngkorVat:
      return t('place.cambodia')
    case Place.AmurRiver:
      return t('place.china-russia')
    case Place.BeringStrait:
      return t('place.usa-russia')
    case Place.MountFuji:
      return t('place.japan')
    case Place.Borobudur:
    case Place.Sulawesi:
    case Place.Papua:
      return t('place.indonesia')
    case Place.ArnhemLand:
    case Place.BungleBungleRange:
    case Place.GreatBarrierReef:
    case Place.Perth:
    case Place.Tasmania:
      return t('place.australia')
    case Place.FiordlandNationalPark:
      return t('place.new-zealand')
    default:
      return ''
  }
}

const getContinent = (place: Place, t: TFunction): string => {
  switch (place) {
    case Place.Denali:
    case Place.MackenzieDelta:
    case Place.Banff:
    case Place.CraterLake:
    case Place.OldFaithful:
    case Place.PuertoRico:
    case Place.GrandCanyon:
    case Place.NiagaraFalls:
    case Place.Louisiane:
    case Place.Newfoundland:
    case Place.Greenland:
      return t('place.north-america')
    case Place.Teotihuacan:
    case Place.Tikal:
      return t('place.central-america')
    case Place.SaltoAngel:
    case Place.Marajo:
    case Place.AmazonRainforest:
    case Place.MachuPicchu:
    case Place.Aripuana:
    case Place.SalvadorDeBahia:
    case Place.Altiplano:
    case Place.IguazuFalls:
    case Place.Atacama:
    case Place.GalapagosIslands:
    case Place.RapaNui:
    case Place.TierraDelFuego:
      return t('place.south-america')
    case Place.Svalbard:
    case Place.Thingvellir:
    case Place.Stonehenge:
    case Place.Rome:
    case Place.Athens:
    case Place.CanaryIslands:
      return t('place.europe')
    case Place.Timgad:
    case Place.Sahara:
    case Place.Giza:
    case Place.Timbuktu:
    case Place.Kush:
    case Place.Aksum:
    case Place.Elmina:
    case Place.Douala:
    case Place.Virunga:
    case Place.VictoriaFalls:
    case Place.Omatako:
    case Place.Madagascar:
      return t('place.africa')
    case Place.Petra:
    case Place.Babylone:
    case Place.Persepolis:
    case Place.Sanaa:
    case Place.CaspianSea:
    case Place.Zagorsk:
    case Place.PutoranaPlateau:
    case Place.Novossibirsk:
    case Place.Harappa:
    case Place.Sakha:
    case Place.LakeBaikal:
    case Place.GreatWall:
    case Place.MountEverest:
    case Place.TajMahal:
    case Place.Sigiriya:
    case Place.Bagan:
    case Place.AngkorVat:
    case Place.Xian:
    case Place.AmurRiver:
    case Place.Kolyma:
    case Place.BeringStrait:
    case Place.MountFuji:
    case Place.Borobudur:
    case Place.Sulawesi:
      return t('place.asia')
    case Place.Papua:
    case Place.ArnhemLand:
    case Place.BungleBungleRange:
    case Place.GreatBarrierReef:
    case Place.Uluru:
    case Place.Perth:
    case Place.Tasmania:
    case Place.FiordlandNationalPark:
      return t('place.oceania')
    default:
      return ''
  }
}

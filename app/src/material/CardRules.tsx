/** @jsxImportSource @emotion/react */
import { MaterialRulesProps, PlayMoveButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { Trans, useTranslation } from 'react-i18next'
import { getPlayerName } from '@gamepark/expedition/ExpeditionOptions'
import Color from '@gamepark/expedition/Color'
import { isMoveItem, MaterialRulesMove } from '@gamepark/rules-api'
import { RuleId } from '@gamepark/expedition/rules/RuleId'
import { places2StepsFromStart } from '@gamepark/expedition/material/Place'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'

export const CardRules = (props: MaterialRulesProps) => {
  const { item, legalMoves, close } = props
  const { t } = useTranslation()
  const rules = useRules<ExpeditionRules>()!
  const player = usePlayerId<Color>()
  const deck = item.location?.type === LocationType.Deck
  const hand = item.location?.type === LocationType.Hand
  const common = item.location?.type === LocationType.CommonObjectives
  const scored = item.location?.type === LocationType.PlayerArea
  const playerName = usePlayerName(item.location!.player!) || getPlayerName(item.location!.player!, t)
  return <>
    <h2>{t('rules.card.title')}</h2>
    <p>{t('rules.card.purpose')}</p>
    {deck &&
      <p>{t('rules.card.deck', { number: rules.material(MaterialType.Card).location(LocationType.Deck).length })}</p>}
    {hand && <HandCardRules {...props}/>}
    {common && <p>{t('rules.card.common')}</p>}
    {scored && item.location?.player === player && <p>{t('rules.card.scored')}</p>}
    {scored && item.location?.player !== player &&
      <p>{t('rules.card.scored.other', { player: playerName })}</p>}
    {legalMoves.length === 1 &&
      <PlayMoveButton move={legalMoves[0]} onPlay={close}>
        {t('rules.card.draw')}
      </PlayMoveButton>
    }
    {/* TODO: add cards texts with translation:
      <h3><em>Babylone</em></h3>
      <p><em><strong>Irak</strong> - Asie</em></p>
      <p><em>Le Lion de babylone...</em></p>*/}
  </>
}

const HandCardRules = ({ item, close }: MaterialRulesProps) => {
  const { t } = useTranslation()
  const player = usePlayerId<Color>()
  const rules = useRules<ExpeditionRules>()!
  const mine = player !== undefined && item.location?.player === player
  const legalMoves = useLegalMoves<MaterialRulesMove>()
  const placeTokenMove = legalMoves.find(move => isMoveItem(move) && move.itemType === MaterialType.Token && move.item.location?.id === item.id)
  const tokens = rules.material(MaterialType.Token)
  const isRevealed = mine && tokens.location(LocationType.Place).locationId(item.id).length > 0
  const playerName = usePlayerName(item.location!.player!) || getPlayerName(item.location!.player!, t)
  return <>
    {mine && !isRevealed && <p>{t('rules.card.hand.private')}</p>}
    {mine && isRevealed && <p>{t('rules.card.hand.revealed')}</p>}
    {placeTokenMove &&
      <Trans defaults="rules.card.hand.place.token" components={[
        <PlayMoveButton move={placeTokenMove} onPlay={close}/>
      ]}/>
    }
    {rules.game.rule?.id === RuleId.SetupKeyPlaces && rules.game.rule.player === player && places2StepsFromStart.includes(item.id) &&
      <p>{t('rules.place.token.forbidden')}</p>
    }
    {!mine && <p>{t('rules.card.hand.other', { player: playerName })}</p>}
  </>
}

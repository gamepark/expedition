import Color from './Color'
import { MaterialType } from './material/ExpeditionMaterial'
import { LocationType } from './material/LocationType'
import { places, places2StepsFromStart } from './material/Place'
import {
  Competitive,
  hideItemId,
  hideItemIdToOthers,
  MaterialGame,
  MaterialRulesMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { ExpeditionOptions } from './ExpeditionOptions'
import { arrowColors } from './material/ArrowColor'
import { RuleId, rulesSteps } from './rules/RuleId'

export class ExpeditionRules extends SecretMaterialRules<Color, MaterialType, LocationType>
  implements Competitive<MaterialGame<Color, MaterialType, LocationType>, MaterialRulesMove<Color, MaterialType, LocationType>, Color>,
    TimeLimit<MaterialGame<Color, MaterialType, LocationType>, MaterialRulesMove<Color, MaterialType, LocationType>, Color> {

  rulesSteps = rulesSteps

  hidingStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: hideItemId,
      [LocationType.Hand]: hideItemIdToOthers
    }
  }

  getLocationsStrategies() {
    return {
      [MaterialType.Card]: {
        [LocationType.Deck]: new PositiveSequenceStrategy(),
        [LocationType.Hand]: new PositiveSequenceStrategy(),
        [LocationType.PlayerArea]: new PositiveSequenceStrategy()
      },
      [MaterialType.Arrow]: {
        [LocationType.Road]: new PositiveSequenceStrategy()
      }
    }
  }

  setup({ players }: ExpeditionOptions) {
    const cards = this.materialOperations(MaterialType.Card)
    for (let x = 0; x < places.length; x++) {
      const place = places[x]
      cards.create({ id: place, location: { type: LocationType.Deck } })
    }
    cards.shuffle()

    const deal = players.length <= 3 ? 12 : 9
    const cardDeck = cards.search().location(LocationType.Deck)
    for (const player of players) {
      for (let i = 0; i < deal; i++) {
        const card = cardDeck.maxBy((location) => location.x)
        card!.location = { type: LocationType.Hand, player: player.id, x: i }
      }
      // TODO: if player does not have at least 4 places 3 nodes away from the start, discard hand under the deck and draw again
    }

    let commonObjectives = 0
    while (commonObjectives < 6) {
      const card = cards
        .search()
        .location(LocationType.Deck)
        .maxBy((location) => location.x)!
      if (places2StepsFromStart.includes(card.id)) {
        cards.move(cards.items.indexOf(card), { location: { type: LocationType.Deck, x: 0 } })
      } else {
        cards.move(cards.items.indexOf(card), { location: { type: LocationType.CommonObjectives, x: commonObjectives } })
        commonObjectives++
      }
    }

    const tokens = this.materialOperations(MaterialType.Token)
    const tickets = this.materialOperations(MaterialType.Ticket)

    for (const player of players) {
      tokens.create({
        id: player.id,
        quantity: 4,
        location: { type: LocationType.PlayerArea, player: player.id }
      })
      tickets.create({
        quantity: 3,
        location: { type: LocationType.PlayerArea, player: player.id }
      })
    }


    const arrows = this.materialOperations(MaterialType.Arrow)
    for (const arrowColor of arrowColors) {
      arrows.create({
        id: arrowColor,
        quantity: 45,
        location: { type: LocationType.ArrowsStock }
      })
    }

    this.start(RuleId.SetupKeyPlaces, this.game.players[0], { arrowsLeft: 1, ticketsPlayed: 0, loopsCreated: [] })
  }

  giveTime(): number {
    return 30
  }

  rankPlayers(playerA: Color, playerB: Color): number {
    const scoreA = this.getScore(playerA)
    const scoreB = this.getScore(playerB)
    if (scoreA !== scoreB) return scoreB - scoreA
    const ticketsA = this.material(MaterialType.Ticket).player(playerA).getItem()?.quantity ?? 0
    const ticketsB = this.material(MaterialType.Ticket).player(playerB).getItem()?.quantity ?? 0
    return ticketsB - ticketsA
  }

  getScore(playerId: Color): number {
    const cards = this.material(MaterialType.Card).player(playerId)
    const tokens = this.material(MaterialType.Token).id(playerId)
    const cardsInFrontOfPlayer = cards.location(LocationType.PlayerArea).length
    const tokensCollected = tokens.location(LocationType.Card).length
    const cardsInHand = cards.location(LocationType.Hand).length
    const tokensOnBoard = tokens.location(LocationType.Place).length
    return cardsInFrontOfPlayer + tokensCollected - cardsInHand - tokensOnBoard
  }
}

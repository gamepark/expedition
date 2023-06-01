import Color from './Color'
import { MaterialType } from './material/ExpeditionMaterial'
import { LocationType } from './material/LocationType'
import { Place, places, places2StepsFromStart } from './material/Place'
import {
  Competitive,
  FillGapStrategy,
  hideItemId,
  hideItemIdToOthers,
  MaterialGame,
  MaterialRulesMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { arrowColors } from './material/ArrowColor'
import { RuleId, rulesSteps } from './rules/RuleId'

const COMMON_OBJECTIVES = 6
const TOKENS_PER_PLAYER = 4
const START_TICKETS = 3
const ARROWS_PER_EXPEDITION = 45

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
        [LocationType.PlayerArea]: new PositiveSequenceStrategy(),
        [LocationType.CommonObjectives]: new FillGapStrategy()
      },
      [MaterialType.Arrow]: {
        [LocationType.Road]: new PositiveSequenceStrategy()
      }
    }
  }

  setup() {
    this.createDeck()
    this.dealCards()
    this.revealCommonObjectives()
    this.createTokens()
    this.giveStartTickets()
    this.createArrows()
    this.start(RuleId.SetupKeyPlaces, this.game.players[0], { arrowsLeft: 1, ticketsPlayed: 0, loopsCreated: [] })
  }

  private createDeck() {
    const cards = this.materialOperations(MaterialType.Card)
    for (const place of places) {
      cards.create({ id: place, location: { type: LocationType.Deck } })
    }
    cards.shuffle()
  }

  private dealCards() {
    const cardsPerPlayer = this.game.players.length <= 3 ? 12 : 9
    for (const player of this.game.players) {
      this.dealPlayerCards(player, cardsPerPlayer)
      while (!this.hasEnoughCards2StepsFromStart(player)) {
        this.discardCards(player)
        this.dealPlayerCards(player, cardsPerPlayer)
      }
    }
  }

  private dealPlayerCards(player: Color, quantity: number) {
    this.material(MaterialType.Card).location(LocationType.Deck)
      .sort(item => -item.location.x!).limit(quantity)
      .moveItems(LocationType.Hand, { player }).forEach(move => this.play(move))
  }

  private hasEnoughCards2StepsFromStart(player: Color) {
    return this.material(MaterialType.Card).location(LocationType.Hand).player(player)
      .id<Place>(place => !places2StepsFromStart.includes(place!)).length >= TOKENS_PER_PLAYER
  }

  private discardCards(player: Color) {
    this.material(MaterialType.Card).location(LocationType.Hand).player(player)
      .moveItems(LocationType.Deck, { x: 0 }).forEach(move => this.play(move))
  }

  private revealCommonObjectives() {
    const cards = this.material(MaterialType.Card)
    const deck = cards.location(LocationType.Deck).sort(item => -item.location.x!)
    deck.limit(COMMON_OBJECTIVES).moveItems(LocationType.CommonObjectives).forEach(move => this.play(move))
    while (true) {
      const cardsToReplace = cards.location(LocationType.CommonObjectives).id<Place>(place => places2StepsFromStart.includes(place!))
      if (cardsToReplace.length > 0) {
        cardsToReplace.moveItems(LocationType.Deck, { x: 0 }).forEach(move => this.play(move))
        deck.limit(cardsToReplace.length).moveItems(LocationType.CommonObjectives).forEach(move => this.play(move))
      } else {
        return
      }
    }
  }

  private createTokens() {
    const tokens = this.materialOperations(MaterialType.Token)
    for (const player of this.game.players) {
      tokens.create({ id: player, quantity: TOKENS_PER_PLAYER, location: { type: LocationType.PlayerArea, player } })
    }
  }

  private giveStartTickets() {
    const tickets = this.materialOperations(MaterialType.Ticket)
    for (const player of this.game.players) {
      tickets.create({ quantity: START_TICKETS, location: { type: LocationType.PlayerArea, player } })
    }
  }

  private createArrows() {
    const arrows = this.materialOperations(MaterialType.Arrow)
    for (const arrowColor of arrowColors) {
      arrows.create({ id: arrowColor, quantity: ARROWS_PER_EXPEDITION, location: { type: LocationType.ArrowsStock } })
    }
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

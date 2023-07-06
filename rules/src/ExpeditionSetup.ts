import Color from './Color'
import { MaterialType } from './material/ExpeditionMaterial'
import { LocationType } from './material/LocationType'
import { Place, places, places2StepsFromStart } from './material/Place'
import { MaterialGameSetup } from '@gamepark/rules-api'
import { arrowColors } from './material/ArrowColor'
import { RuleId } from './rules/RuleId'
import { ExpeditionOptions } from './ExpeditionOptions'
import { locationsStrategies } from './material/LocationStrategies'

const COMMON_OBJECTIVES = 6
const TOKENS_PER_PLAYER = 4
const START_TICKETS = 3
const ARROWS_PER_EXPEDITION = 45

export class ExpeditionSetup extends MaterialGameSetup<Color, MaterialType, LocationType, ExpeditionOptions> {
  locationsStrategies = locationsStrategies

  setupMaterial() {
    this.createDeck()
    this.dealCards()
    this.revealCommonObjectives()
    this.createTokens()
    this.giveStartTickets()
    this.createArrows()
  }

  createDeck() {
    this.material(MaterialType.Card).createItems(places.map(id => ({ id, location: { type: LocationType.Deck } })))
    this.material(MaterialType.Card).shuffle()
  }

  dealCards() {
    const cardsPerPlayer = this.players.length <= 3 ? 12 : 9
    for (const player of this.players) {
      this.dealPlayerCards(player, cardsPerPlayer)
      while (!this.hasEnoughCards2StepsFromStart(player)) {
        this.discardCards(player)
        this.dealPlayerCards(player, cardsPerPlayer)
      }
    }
  }

  dealPlayerCards(player: Color, quantity: number) {
    this.material(MaterialType.Card).location(LocationType.Deck)
      .sort(item => -item.location.x!).limit(quantity)
      .moveItems({ location: { type: LocationType.Hand, player } })
  }

  hasEnoughCards2StepsFromStart(player: Color) {
    return this.material(MaterialType.Card).location(LocationType.Hand).player(player)
      .id<Place>(place => !places2StepsFromStart.includes(place!))
      .length >= TOKENS_PER_PLAYER
  }

  discardCards(player: Color) {
    this.material(MaterialType.Card).location(LocationType.Hand).player(player).moveItems({ location: { type: LocationType.Deck, x: 0 } })
  }

  revealCommonObjectives() {
    this.drawCommonObjectives(COMMON_OBJECTIVES)
    let cardsToReplace
    while ((cardsToReplace = this.getCommonObjectives2StepsFromStart()).length > 0) {
      cardsToReplace.moveItems({ location: { type: LocationType.Deck, x: 0 } })
      this.drawCommonObjectives(cardsToReplace.length)
    }
  }

  drawCommonObjectives(quantity: number) {
    this.material(MaterialType.Card).location(LocationType.Deck)
      .sort(item => -item.location.x!).limit(quantity)
      .moveItems({ location: { type: LocationType.CommonObjectives } })
  }

  getCommonObjectives2StepsFromStart() {
    return this.material(MaterialType.Card).location(LocationType.CommonObjectives).id<Place>(place => places2StepsFromStart.includes(place!))
  }

  createTokens() {
    this.material(MaterialType.Token).createItems(this.players.map(player => (
      { id: player, quantity: TOKENS_PER_PLAYER, location: { type: LocationType.PlayerArea, player } }
    )))
  }

  giveStartTickets() {
    this.material(MaterialType.Ticket).createItems(this.players.map(player => (
      { quantity: START_TICKETS, location: { type: LocationType.PlayerArea, player } }
    )))
  }

  createArrows() {
    this.material(MaterialType.Arrow).createItems(arrowColors.map(id => (
      { id, quantity: ARROWS_PER_EXPEDITION, location: { type: LocationType.ArrowsStock, id } }
    )))
  }

  start(options: ExpeditionOptions) {
    return { id: RuleId.SetupKeyPlaces, player: options.players[0].id }
  }
}

import Color from './Color'
import { MaterialType } from './material/ExpeditionMaterial'
import { LocationType } from './material/ExpeditionLocations'
import { places } from './material/Place'
import { hideItemId, hideItemIdToOthers, MaterialGame, SecretMaterialRules, Undo } from '@gamepark/rules-api'
import { ExpeditionOptions } from './ExpeditionOptions'
import { arrowColors } from './material/ArrowColor'
import Move from './moves/Move'
import { RulesStep, rulesSteps } from './rules/RulesStep'

export class ExpeditionRules extends SecretMaterialRules<Color, MaterialType, LocationType>
  implements Undo<MaterialGame<Color, MaterialType, LocationType>, Move, Color> {

  rulesSteps = rulesSteps

  hidingStrategies = {
    [MaterialType.Card]: {
      [LocationType.CardsDeck]: hideItemId,
      [LocationType.Hand]: hideItemIdToOthers
    }
  }

  canUndo(): boolean {
    return true
  }

  setup({ players }: ExpeditionOptions) {
    const cards = this.materialOperations(MaterialType.Card)
    for (let x = 0; x < places.length; x++) {
      const place = places[x]
      cards.create({ id: place, location: { type: LocationType.CardsDeck, x } })
    }
    cards.shuffle()

    const deal = players.length <= 3 ? 12 : 9
    const cardDeck = cards.search().location(LocationType.CardsDeck)
    for (const player of players) {
      for (let i = 0; i < deal; i++) {
        const card = cardDeck.maxBy((location) => location.x)
        card!.location = { type: LocationType.Hand, player: player.id, x: i }
      }
      // TODO: if player does not have at least 4 places 3 nodes away from the start, discard hand under the deck and draw again
    }

    for (let i = 0; i < 6; i++) {
      const card = cards
        .search()
        .location(LocationType.CardsDeck)
        .maxBy((location) => location.x)!
      // TODO: put card at the bottom of the deck & draw another one if it is not 3 nodes away from the start
      card.location = { type: LocationType.CommonPlacesArea, x: i }
    }

    const tokens = this.materialOperations(MaterialType.Token)
    const tickets = this.materialOperations(MaterialType.Ticket)

    for (const player of players) {
      tokens.create({
        id: player.id,
        quantity: 4,
        location: { type: LocationType.TokenArea, player: player.id }
      })
      tickets.create({
        quantity: 3,
        location: { type: LocationType.TicketArea, player: player.id }
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

    this.start(RulesStep.SetupKeyPlaces, this.game.players[0], { arrowsLeft: 1, ticketsPlayed: 0, loopsCreated: [] })
  }
}

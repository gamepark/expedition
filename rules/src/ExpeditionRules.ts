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

  setup(options: ExpeditionOptions) {
    const cards = this.material(MaterialType.Card)
    cards
      .create(
        places.map((place, i) => ({
          id: place,
          location: { type: LocationType.CardsDeck, x: i }
        }))
      )
      .shuffle()

    const deal = options.players.length <= 3 ? 12 : 9
    const cardDeck = cards.search().location(LocationType.CardsDeck)
    for (const player of options.players) {
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

    const tokens = this.material(MaterialType.Token)
    tokens.create(options.players.map(player => ({
      id: player.id,
      quantity: 4,
      location: { type: LocationType.TokenArea, player: player.id }
    })))

    const tickets = this.material(MaterialType.Ticket)
    tickets.create(options.players.map(player => ({
      quantity: 3, location: { type: LocationType.TicketArea, player: player.id }
    })))

    const arrows = this.material(MaterialType.Arrow)
    arrows.create(
      arrowColors.map((arrow) => ({
        id: arrow,
        quantity: 45,
        location: { type: LocationType.ArrowsStock }
      }))
    )

    this.start(RulesStep.SetupKeyPlaces, this.game.players[0])
  }
}

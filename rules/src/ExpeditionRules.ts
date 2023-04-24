import Color from './Color'
import { MaterialType } from './material/ExpeditionMaterial'
import { LocationType } from './material/ExpeditionLocations'
import { places } from './material/Place'
import { MaterialGame, MaterialRules, Undo } from '@gamepark/rules-api'
import { ExpeditionOptions } from './ExpeditionOptions'
import { ArrowColor, arrowColors } from './material/ArrowColor'
import { SetupKeyPlaces } from './rules/SetupKeyPlaces'
import { PlayerTurn } from './rules/PlayerTurn'
import { TicketEffect } from './rules/TicketEffect'
import { StartNode } from './material/Road'
import Move from './moves/Move'

export class ExpeditionRules extends MaterialRules<
  Color,
  MaterialType,
  LocationType
> implements Undo<MaterialGame<Color, MaterialType, LocationType>, Move, Color> {

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

    for (const player of options.players) {
      const tokens = this.material(MaterialType.Token)
      tokens.create(4, (x) => ({
        id: player.id,
        location: { type: LocationType.TokenArea, x, player: player.id }
      }))
      const tickets = this.material(MaterialType.Ticket)
      tickets.create([{quantity: 3, location: { type: LocationType.TicketArea, player: player.id }}])
    }

    const arrows = this.material(MaterialType.Arrow)
    arrows.create(
      arrowColors.map((arrow) => ({
        id: arrow,
        quantity: 45,
        location: { type: LocationType.ArrowsStock }
      }))
    )

    this.setData({
      expeditions: {
        [ArrowColor.Red]: StartNode,
        [ArrowColor.Blue]: StartNode,
        [ArrowColor.Yellow]: StartNode
      }
    })

    this.start(SetupKeyPlaces, this.game.players[0])
  }

  getRulesSteps() {
    return [SetupKeyPlaces, PlayerTurn, TicketEffect]
  }
}

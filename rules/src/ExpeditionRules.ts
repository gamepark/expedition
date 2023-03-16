import Color from './Color'
import {MaterialType} from './material/ExpeditionMaterial'
import {LocationType} from './material/ExpeditionLocations'
import {places} from './material/Place'
import {MaterialRules} from '@gamepark/rules-api'
import {ExpeditionOptions} from './ExpeditionOptions'

export class ExpeditionRules extends MaterialRules<Color> {
  setup(options: ExpeditionOptions) {
    const cards = this.material(MaterialType.Card)
    cards
      .create(...places.map((place, i) => ({id: place, location: {type: LocationType.CardsDeck, x: i}})))
      .shuffle()
    const deal = options.players.length <= 3 ? 12 : 9
    for (const player of options.players) {
      for (let i = 0; i < deal; i++) {
        const card = cards.items.filter(card => card.location.type === LocationType.CardsDeck)
          .reduce((topCard, card) => card.location.x! > topCard.location.x! ? card : topCard)
        card.location = {type: LocationType.Hand, player: player.id, x: i}
      }
      // TODO: if player does not have at least 4 places 3 nodes away from the start, discard hand under the deck and draw again
    }
  }
}
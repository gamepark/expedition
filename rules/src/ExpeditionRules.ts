import Color from './Color'
import {MaterialType} from './material/ExpeditionMaterial'
import {LocationType} from './material/ExpeditionLocations'
import {places} from './material/Place'
import {MaterialRules} from '@gamepark/rules-api'

export class ExpeditionRules extends MaterialRules<Color> {
  setup() {
    return this.movesBuilder()
      .createItems(MaterialType.Card, places.map((place, i) => ({id: place, location: {type: LocationType.CardsDeck, x: i}})))
      .shuffle(MaterialType.Card)
      .moves
    /*
    const deal = this.game.players.length <= 3 ? 12 : 9
    for (const playerId in this.game.players) {
      for (let i = 0; i < deal; i++) {
        const card = material.getItem(MaterialType.Place, LocationType.Deck)
        material.move(card, LocationType.Hand, playerId) // TODO: x maximum
      }
    }*/
  }
}
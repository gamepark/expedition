import Color from '@gamepark/expedition/Color'
import { ExpeditionSetup } from '@gamepark/expedition/ExpeditionSetup'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { Place } from '@gamepark/expedition/material/Place'

export class TutorialSetup extends ExpeditionSetup {
  createDeck() {
    super.createDeck()
    this.material(MaterialType.Card).id(Place.CanaryIslands).moveItems({ type: LocationType.Board })
    this.material(MaterialType.Card).id(Place.PuertoRico).moveItems({ type: LocationType.Board })
    this.material(MaterialType.Card).id(Place.NorthwestPassage).moveItems({ type: LocationType.Board })
    this.material(MaterialType.Card).id(Place.Rome).moveItems({ type: LocationType.Deck, x: 0 })
    this.material(MaterialType.Card).id(Place.Thingvellir).moveItems({ type: LocationType.Deck, x: 0 })
  }

  dealCards() {
    super.dealCards()
    this.discard(Color.Blue, 2)
    this.discard(Color.Red, 1)
    this.material(MaterialType.Card).id(Place.CanaryIslands).moveItems({ type: LocationType.Hand, player: Color.Blue })
    this.material(MaterialType.Card).id(Place.PuertoRico).moveItems({ type: LocationType.Hand, player: Color.Blue })
    this.material(MaterialType.Card).id(Place.NorthwestPassage).moveItems({ type: LocationType.Hand, player: Color.Red })
  }

  discard(player: Color, quantity: number) {
    this.material(MaterialType.Card).location(LocationType.Hand).player(player).limit(quantity)
      .moveItems({ type: LocationType.Deck, x: 0 })
  }
}
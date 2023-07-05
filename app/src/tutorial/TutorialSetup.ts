import { ExpeditionSetup } from '@gamepark/expedition/ExpeditionSetup'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { Place } from '@gamepark/expedition/material/Place'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import Color from '@gamepark/expedition/Color'

export class TutorialSetup extends ExpeditionSetup {
  createDeck() {
    super.createDeck()
    this.material(MaterialType.Card).id(Place.CanaryIslands).moveItems({ location: { type: LocationType.Board } })
    this.material(MaterialType.Card).id(Place.PuertoRico).moveItems({ location: { type: LocationType.Board } })
    this.material(MaterialType.Card).id(Place.NorthwestPassage).moveItems({ location: { type: LocationType.Board } })
    this.material(MaterialType.Card).id(Place.Rome).moveItems({ location: { type: LocationType.Deck, x: 0 } })
    this.material(MaterialType.Card).id(Place.Thingvellir).moveItems({ location: { type: LocationType.Deck, x: 0 } })
  }

  dealCards() {
    super.dealCards()
    this.discard(Color.Blue, 2)
    this.discard(Color.Red, 1)
    this.material(MaterialType.Card).id(Place.CanaryIslands).moveItems({ location: { type: LocationType.Hand, player: Color.Blue } })
    this.material(MaterialType.Card).id(Place.PuertoRico).moveItems({ location: { type: LocationType.Hand, player: Color.Blue } })
    this.material(MaterialType.Card).id(Place.NorthwestPassage).moveItems({ location: { type: LocationType.Hand, player: Color.Red } })
  }

  discard(player: Color, quantity: number) {
    this.material(MaterialType.Card).location(LocationType.Hand).player(player).limit(quantity)
      .moveItems({ location: { type: LocationType.Deck, x: 0 } })
  }
}
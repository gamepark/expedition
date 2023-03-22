import Color from '../Color'
import {MaterialType} from '../material/ExpeditionMaterial'
import {LocationType} from '../material/ExpeditionLocations'
import {MaterialMove, MaterialMoveType, MoveKind, PlayerRulesStep} from '@gamepark/rules-api'

export class SetupKeyPlaces extends PlayerRulesStep<Color, MaterialType> {
  getPlayerMoves() {
    const tokens = this.game.items[MaterialType.Token]!.filter(token => token.location.type === LocationType.TokenArea && token.location.player)
    const cards = this.game.items[MaterialType.Card]!.filter(card => card.location.type === LocationType.Hand && card.location.player === this.player
      && !this.game.items[MaterialType.Token]!.some(token => token.location.type === LocationType.Place && token.location.id === card.id))
    return tokens.flatMap((_, index) => cards.map<MaterialMove>(card => ({
        kind: MoveKind.MaterialMove,
        itemsType: MaterialType.Token,
        type: MaterialMoveType.Move,
        item: index,
        location: {type: LocationType.Place, id: card.id}
      }))
    )
  }
}
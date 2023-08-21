import Color from '../Color'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { RuleId } from './RuleId'
import { Place, places2StepsFromStart } from '../material/Place'

export class SetupKeyPlaces extends PlayerTurnRule<Color, MaterialType, LocationType> {
  getPlayerMoves() {
    const playerTokens = this.material(MaterialType.Token).id(this.player)
    const tokenStock = playerTokens.location(LocationType.PlayerArea)
    if (!tokenStock.length) return []
    const playerCards = this.material(MaterialType.Card).location(LocationType.Hand).player(this.player)
    const placesWithToken = playerTokens.location(LocationType.Place).getItems<Place>(token => token.location.id)
    const legalPlaces = playerCards.getItems<Place>(card => card.id).filter(place =>
      !placesWithToken.includes(place) && !places2StepsFromStart.includes(place)
    )
    return legalPlaces.map(place => tokenStock.moveItem({ location: { type: LocationType.Place, id: place } }))
  }

  afterItemMove(move: ItemMove<Color, MaterialType, LocationType>) {
    if (move.itemType === MaterialType.Token) {
      const nextPlayer = this.nextPlayer
      const hasTokensLeft = this.material(MaterialType.Token).player(nextPlayer).location(LocationType.PlayerArea).length > 0
      const nextStep = hasTokensLeft ? RuleId.SetupKeyPlaces : RuleId.PlayerTurn
      return [this.rules().startPlayerTurn(nextStep, nextPlayer)]
    }
    return []
  }
}

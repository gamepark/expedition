import Color from '../Color'
import { MaterialType } from '../material/ExpeditionMaterial'
import { LocationType } from '../material/ExpeditionLocations'
import { MaterialRulesMove, MoveKind, PlayerRulesStep } from '@gamepark/rules-api'
import { RulesStep } from './RulesStep'
import { Place, places2StepsFromStart } from '../material/Place'

export class SetupKeyPlaces extends PlayerRulesStep<Color, MaterialType, LocationType> {
  getPlayerMoves() {
    const playerTokens = this.material(MaterialType.Token).id(this.player)
    const playerCards = this.material(MaterialType.Card).location(LocationType.Hand).player(this.player)
    const placesWithToken = playerTokens.location(LocationType.Place).getItems<Place>(token => token.location.id)
    const legalPlaces = playerCards.getItems<Place>(card => card.id).filter(place =>
      !placesWithToken.includes(place) && !places2StepsFromStart.includes(place)
    )
    return legalPlaces.map(place =>
      playerTokens.location(LocationType.TokenArea).moveItem(LocationType.Place, { id: place })
    )
  }

  onMovePlayed(move: MaterialRulesMove<Color, MaterialType, LocationType>): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    if (move.kind === MoveKind.MaterialMove && move.itemsType === MaterialType.Token) {
      const nextPlayer = this.nextPlayer
      const hasTokensLeft = this.material(MaterialType.Token).player(nextPlayer).location(LocationType.TokenArea).length > 0
      const nextStep = hasTokensLeft ? RulesStep.SetupKeyPlaces : RulesStep.PlayerTurn
      return [this.rulesMoves().nextStep(nextStep, nextPlayer, { arrowsLeft: 1, ticketsPlayed: 0, loopsCreated: [] })]
    }
    return []
  }
}

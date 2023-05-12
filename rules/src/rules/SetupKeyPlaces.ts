import Color from '../Color'
import { MaterialType } from '../material/ExpeditionMaterial'
import { LocationType } from '../material/ExpeditionLocations'
import { MaterialRulesMove, MoveKind, PlayerRulesStep } from '@gamepark/rules-api'
import { RulesStep } from './RulesStep'

export class SetupKeyPlaces extends PlayerRulesStep<Color,
  MaterialType,
  LocationType> {
  getPlayerMoves() {
    const moves = this.initializeMoves()

    // Get all tokens
    const tokens = this.material(MaterialType.Token)
    const cards = this.material(MaterialType.Card)

    const tokensOnPlace = tokens.search().location(LocationType.Place).all()

    const cardsInHand = cards
      .search()
      .location(LocationType.Hand)
      .player(this.player)
      .all()

    const cardsWithoutToken = cardsInHand.filter(
      (card) => !tokensOnPlace.some((token) => token.location.id === card.id)
    )

    // Tokens in location
    const tokenMoves = tokens
      .search()
      .location(LocationType.TokenArea)
      .player(this.player)
      .moves()

    // TODO: find a better solution
    for (const card of cardsWithoutToken) {
      moves.push(
        ...tokenMoves.moveTo(LocationType.Place, () => ({ id: card.id }))
      )
    }

    return moves
  }

  onMovePlayed(move: MaterialRulesMove<Color, MaterialType, LocationType>): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    if (move.kind === MoveKind.MaterialMove && move.itemsType === MaterialType.Token) {
      const remainingTokens = this.material(MaterialType.Token)
        .search()
        .location(LocationType.TokenArea)
        .all()

      const nextStep = remainingTokens.length ? RulesStep.SetupKeyPlaces : RulesStep.PlayerTurn
      return [this.rulesMoves().nextStep(nextStep, this.nextPlayer())]
    }

    return []
  }
}

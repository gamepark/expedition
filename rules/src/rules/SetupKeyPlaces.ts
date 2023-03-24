import Color from "../Color";
import { MaterialType } from "../material/ExpeditionMaterial";
import { LocationType } from "../material/ExpeditionLocations";
import { PlayerRulesStep } from "@gamepark/rules-api";

export class SetupKeyPlaces extends PlayerRulesStep<
  Color,
  MaterialType,
  LocationType
> {
  getPlayerMoves() {
    const moves = this.initializeMoves();

    // Get all tokens
    const tokens = this.material(MaterialType.Token);
    const cards = this.material(MaterialType.Card);

    const tokensOnPlace = tokens.search().location(LocationType.Place).all();

    const cardsInHand = cards
      .search()
      .location(LocationType.Hand)
      .player(this.player)
      .all();

    const cardsWithoutToken = cardsInHand.filter(
      (card) => !tokensOnPlace.some((token) => token.location.id === card.id)
    );

    // Tokens in location
    const tokenSearch = tokens
      .search()
      .location(LocationType.TokenArea)
      .player(this.player)
      .moves();

    // TODO: find a better solution
    for (const card of cardsWithoutToken) {
      moves.push(
        ...tokenSearch.moveTo(LocationType.Place, () => ({ id: card.id }))
      );
    }

    return moves;
  }
}

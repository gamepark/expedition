import { Node } from './material/Road'
import { ArrowColor } from './material/ArrowColor'

/**
 * This type describe the data structure representing the state of a game, in the database
 */
type Game = {
  round: number // example

  expeditions: Record<ArrowColor, Node | undefined>;
  /*
  phase: Phase
  cards: Card[]
  ...
  */
}

export default Game

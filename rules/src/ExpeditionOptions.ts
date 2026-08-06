import { OptionsSpecV2 } from '@gamepark/rules-api'
import Color, { playerColors } from './Color'

/**
 * This is the options for each player in the game.
 */
type ExpeditionPlayerOptions = { id: Color }

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type ExpeditionOptions = {
  players: ExpeditionPlayerOptions[]
}

/**
 * The option space of expedition: structure only.
 *
 * Labels live in the game's presentation document, published beside its translations at
 * `/options/<locale>.json` and keyed by convention. Subscription and competitive gates live in
 * the platform database, so they can change without releasing the game again.
 */
export const ExpeditionOptionsSpecV2: OptionsSpecV2 = {
  specVersion: 2,
  players: { min: 2, max: 6 },
  identities: { values: playerColors }
}

export function getPlayerName(playerId: Color, t: (key: string) => string) {
  switch (playerId) {
    case Color.Red:
      return t('Red')
    case Color.Pink:
      return t('Pink')
    case Color.Blue:
      return t('Blue')
    case Color.Green:
      return t('Green')
    case Color.Yellow:
      return t('Yellow')
    case Color.White:
      return t('White')
  }
}

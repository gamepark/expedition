import { OptionsSpec } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
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
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const ExpeditionOptionsSpec: OptionsSpec<ExpeditionOptions> = {
  players: {
    id: {
      label: (t: TFunction) => t('Player color'),
      values: playerColors,
      valueSpec: color => ({label: t => getPlayerName(color, t)})
    }
  }
}

export function getPlayerName(playerId: Color, t: TFunction) {
  switch (playerId) {
    case Color.Red:
      return t('Red')
    case Color.Pink :
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
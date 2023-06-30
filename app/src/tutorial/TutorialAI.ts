import { GameAI } from '@gamepark/react-client'
import { isEndGame, isMoveItem, isStartPlayerTurn, MaterialGame, MaterialMove, MoveKind, playAction } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import maxBy from 'lodash/maxBy'
import { CustomMoveType } from '@gamepark/expedition/rules/CustomMoveType'
import { RuleId } from '@gamepark/expedition/rules/RuleId'
import { PlayerTurnMemory } from '@gamepark/expedition/rules/PlayerTurn'

const TICKET_WEIGHT = 1
type Path = { moves: MaterialMove<Color, MaterialType, LocationType>[], score: number }

export const ai: GameAI<MaterialGame<Color, MaterialType, LocationType>, MaterialMove<Color, MaterialType, LocationType>, Color>
  = (game: MaterialGame<Color, MaterialType, LocationType>, bot: Color): Promise<MaterialMove[]> => {
  const rules = new ExpeditionRules(game)
  if (rules.getLegalMoves(bot).length === 1) return Promise.resolve(rules.getLegalMoves(bot))

  const realPlayer = game.players.find((p: Color) => p !== bot)!

  const bestPath = computeBestPath(game, realPlayer, bot)

  return Promise.resolve(bestPath.moves)
}

const computeBestPath = (game: MaterialGame, realPlayer: Color, bot: Color, path: MaterialMove[] = [], iteration: number = 1): Path => {
  const rules = new ExpeditionRules(game)
  const legalMoves = rules.getLegalMoves(bot)
  if (legalMoves.length === 0 || iteration >= 4) {
    return {
      moves: path,
      score: rules.getScore(bot) - rules.getScore(realPlayer) + countPlayerTickets(rules, bot) * TICKET_WEIGHT
    }
  }

  const paths = filterStupidMoves(rules, legalMoves).map(move =>
    computeBestPath(applyMove(game, move, bot), realPlayer, bot, [...path, move], iteration + 1)
  )

  const maxScore = maxBy(paths, (p) => p.score)!.score!
  const maxPaths = paths.filter((p) => p.score === maxScore)
  return maxPaths[Math.floor(Math.random() * maxPaths.length)]
}

const applyMove = (game: MaterialGame, move: MaterialMove, player: Color) => {
  const rules = new ExpeditionRules(JSON.parse(JSON.stringify(game)))
  playAction(rules, move, player)
  return rules.game
}

const countPlayerTickets = (rules: ExpeditionRules, player: Color) => {
  const tickets = rules.material(MaterialType.Ticket).player(player).getItem()
  return tickets ? tickets.quantity ?? 1 : 0
}

const filterStupidMoves = (rules: ExpeditionRules, legalMoves: MaterialMove[]) => {
  const moves = legalMoves.filter((move) =>
    !isExchangeCard(move)
    && !isPassWhenICanPlaceArrow(move, legalMoves)
    && !isPlaceFirstArrowWithTicket(rules, move)
    && !isRemoveArrowAfterPlacingArrow(rules, move))

  if (!moves.length) return legalMoves
  return moves
}

const isExchangeCard = (move: MaterialMove) => move.kind === MoveKind.CustomMove && move.type === CustomMoveType.ExchangeCard

const isPassWhenICanPlaceArrow = (move: MaterialMove, legalMoves: MaterialMove[]) => isPass(move) && legalMoves.some(isPlaceArrow)

const isPass = (move: MaterialMove) => isStartPlayerTurn(move) || isEndGame(move)

const isPlaceArrow = (move: MaterialMove) => isMoveItem(move, MaterialType.Arrow) && move.position.location?.type === LocationType.Road

const isPlaceFirstArrowWithTicket = (rules: ExpeditionRules, move: MaterialMove) =>
  !arrowWasPlaced(rules) && rules.game.rule?.id === RuleId.TicketRule && isPlaceArrow(move)

const isRemoveArrowAfterPlacingArrow = (rules: ExpeditionRules, move: MaterialMove) => arrowWasPlaced(rules) && isRemoveArrow(move)

const arrowWasPlaced = (rules: ExpeditionRules) => rules.rulesStep?.getMemory<PlayerTurnMemory>().arrowPlaced

const isRemoveArrow = (move: MaterialMove) => isMoveItem(move, MaterialType.Arrow) && move.position.location?.type === LocationType.ArrowsStock




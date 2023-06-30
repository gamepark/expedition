import { GameAI } from '@gamepark/react-client'
import { ItemMoveType, MaterialGame, MaterialMove, MoveKind, playAction, RuleMoveType } from '@gamepark/rules-api'
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

export const ai: GameAI<MaterialGame<Color, MaterialType, LocationType>, MaterialMove, Color> = (game: MaterialGame<Color, MaterialType, LocationType>, bot: Color): Promise<MaterialMove[]> => {
  const rules = new ExpeditionRules(game)
  if (rules.getLegalMoves(bot).length === 1) return Promise.resolve(rules.getLegalMoves(bot))

  const realPlayer = game.players.find((p: Color) => p !== bot)!

  const bestPath = computeBestPath(game, realPlayer, bot)

  return Promise.resolve(bestPath.moves)
}

const computeBestPath = (baseGame: MaterialGame, realPlayer: Color, bot: Color, path: MaterialMove[] = [], iteration: number = 1): Path => {
  const baseRules = new ExpeditionRules(baseGame)
  const legalMoves = getLegalMoves(baseRules, bot)
  if (legalMoves.length === 0 || iteration >= 4) {
    return {
      moves: path,
      score: baseRules.getScore(bot) - baseRules.getScore(realPlayer) + getTickets(baseRules, bot) * TICKET_WEIGHT
    }
  }

  const paths = []
  for (const move of filterStupidMoves(baseRules, legalMoves, bot)) {
    const rules = new ExpeditionRules(JSON.parse(JSON.stringify(baseGame)))
    applyMoves(rules, bot, move)
    const newPath = [
      ...path,
      move
    ]

    const computedPaths = computeBestPath(rules.game, realPlayer, bot, newPath, iteration + 1)
    paths.push(computedPaths)
  }

  const maxScore = maxBy(paths, (p) => p.score)!.score!
  const maxPaths = paths.filter((p) => p.score === maxScore)
  return maxPaths[Math.floor(Math.random() * maxPaths.length)]
}

const getTickets = (rules: ExpeditionRules, bot: Color) => {
  const tickets = rules.material(MaterialType.Ticket).player(bot).getItem()

  if (!tickets) return 0

  return tickets.quantity ?? 1
}

const filterStupidMoves = (rules: ExpeditionRules, legalMoves: MaterialMove[], bot: Color) => {
  const moves = legalMoves.filter((move) => {
    return !isExchangeCard(move)
      && !isPassWhileThereIsOtherMoves(rules, legalMoves, move)
      && !isNotRemoveArrowWhileNoArrowWasPlayed(rules, move, bot)
      && !isRemoveArrowWhileArrowIsPlayed(rules, move, bot)
  })

  if (!moves.length) return legalMoves
  return moves
}

const isExchangeCard = (move: MaterialMove) => {
  return move.kind === MoveKind.CustomMove && move.type === CustomMoveType.ExchangeCard
}

const isPassWhileThereIsOtherMoves = (rules: ExpeditionRules, legalMoves: MaterialMove[], move: MaterialMove) => {
  return (rules.game.rule?.id === RuleId.TicketRule || rules.game.rule?.id === RuleId.LoopRule) && legalMoves.length > 1 && move.kind === MoveKind.RulesMove && move.type === RuleMoveType.StartPlayerTurn
}

const isRemoveArrowWhileArrowIsPlayed = (rules: ExpeditionRules, move: MaterialMove, bot: Color) => {
  if (rules.game.rule?.id === RuleId.TicketRule) {
    const isRemoveArrow = move.kind === MoveKind.ItemMove && move.type === ItemMoveType.Move && move.position.location?.type === LocationType.ArrowsStock
    return rules.getMemory<PlayerTurnMemory>(bot).arrowPlaced && isRemoveArrow
  }

  return true
}

const isNotRemoveArrowWhileNoArrowWasPlayed = (rules: ExpeditionRules, move: MaterialMove, bot: Color) => {
  if (rules.game.rule?.id === RuleId.TicketRule) {
    const isRemoveArrow = move.kind === MoveKind.ItemMove && move.type === ItemMoveType.Move && move.position.location?.type === LocationType.ArrowsStock
    return !rules.getMemory<PlayerTurnMemory>(bot).arrowPlaced && !isRemoveArrow
  }

  return true
}

const getLegalMoves = (rules: ExpeditionRules, bot: Color) => {
  return rules
    .getLegalMoves(bot)
    .filter(move => (
      (move.kind !== MoveKind.CustomMove || move.type !== CustomMoveType.ExchangeCard)
    ))
}

const applyMoves = (rules: ExpeditionRules, bot: Color, move: MaterialMove) => {
  playAction(rules, move, bot)
}

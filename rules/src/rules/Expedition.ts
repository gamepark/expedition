import { Material, MaterialItem, MaterialRulesMove, PlayerTurnRule } from '@gamepark/rules-api'
import Color from '../Color'
import { MaterialType } from '../material/ExpeditionMaterial'
import { LocationType } from '../material/LocationType'
import { arrowRoad, isBlueNode, isGreenNode, isRedNode, Node, roads, StartNode } from '../material/Road'
import equal from 'fast-deep-equal'
import { ArrowColor } from '../material/ArrowColor'
import { PlayerTurnData } from './PlayerTurn'

export class Expedition {
  color: ArrowColor
  arrows: Material

  constructor(color: ArrowColor, arrows: Material) {
    this.color = color
    this.arrows = arrows.id(color)
  }

  get started(): boolean {
    return this.arrows.location(LocationType.Road).length > 0
  }

  get isOver(): boolean {
    return this.arrows.location(LocationType.ArrowsStock).length === 0
  }

  getLegalMoves(loopsAllowed: boolean): MaterialRulesMove<Color, MaterialType, LocationType>[] {
    const stockArrows = this.arrows.location(LocationType.ArrowsStock)
    if (!stockArrows.length) return []
    const expeditionArrows = this.arrows.location(LocationType.Road).getItems()
    return this.getNextArrowOrigin().flatMap(node =>
      roads.filter(road =>
        (road[0] === node || road[1] === node)
        && !expeditionArrows.some(arrow => equal(arrow.location.id, road))
        && (loopsAllowed || !expeditionArrows.some(arrow => arrowRoad(arrow)[0] === (road[0] === node ? road[1] : road[0])))
      ).map(road => {
        return stockArrows.moveItem(LocationType.Road, { id: road }, road[1] === node && { z: 1 })
      })
    )
  }

  getNextArrowOrigin(): Node[] {
    const arrows = this.arrows.location(LocationType.Road).getItems()
    const lastArrow = this.lastArrow
    return lastArrow ? [arrowRoad(lastArrow)[1]] : [...new Set(arrows.map(arrow => arrowRoad(arrow)[1]).concat(StartNode))]
  }

  onReachDestination(
    rules: PlayerTurnRule<Color, MaterialType, LocationType>,
    node: Node
  ) {
    const consequences: MaterialRulesMove<Color, MaterialType, LocationType>[] = []
    const data = rules.getData<PlayerTurnData>()
    if (isGreenNode(node)) {
      const card = rules.material(MaterialType.Card).id(node)
      const item = card.getItem()
      if (item?.location.type === LocationType.CommonObjectives || item?.location.type === LocationType.Hand) {
        consequences.push(card.moveItem(LocationType.PlayerArea, { player: item.location.player ?? rules.player }))
        if (item.location.type === LocationType.Hand) {
          const token = rules.material(MaterialType.Token).id(item.location.player).location(LocationType.Place).locationId(node)
          if (token.length) {
            consequences.push(token.moveItem(LocationType.Card, { parent: node }))
          }
        } else {
          const topDeckCard = rules.material(MaterialType.Card).location(LocationType.Deck).maxBy(item => item.location.x!)
          if (topDeckCard.length > 0) {
            consequences.push(topDeckCard.moveItem(LocationType.CommonObjectives, { x: item.location.x }))
          }
        }
      }
    } else if (isBlueNode(node)) {
      data.arrowsLeft++
    } else if (isRedNode(node)) {
      consequences.push(rules.material(MaterialType.Ticket).createItem({
        quantity: 1,
        location: { type: LocationType.PlayerArea, player: rules.player }
      }))
    }

    return consequences

  }

  get lastArrow(): MaterialItem | undefined {
    const arrows = this.arrows.location(LocationType.Road).getItems()
    return arrows.find(arrow => {
      const destination = arrowRoad(arrow)[1]
      return !arrows.some(otherArrow => arrowRoad(otherArrow)[0] === destination)
    })
  }

  get loop(): boolean {
    return this.started && !this.isOver && !this.lastArrow
  }
}

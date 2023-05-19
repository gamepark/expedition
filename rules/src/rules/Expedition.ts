import { Material, MaterialItem, MaterialRulesMove } from '@gamepark/rules-api'
import Color from '../Color'
import { MaterialType } from '../material/ExpeditionMaterial'
import { LocationType } from '../material/LocationType'
import { arrowRoad, Node, roads, StartNode } from '../material/Road'
import equal from 'fast-deep-equal'
import { ArrowColor } from '../material/ArrowColor'

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
import { Material } from '@gamepark/rules-api'
import equal from 'fast-deep-equal'
import { ArrowColor } from '../material/ArrowColor'
import { LocationType } from '../material/LocationType'
import { arrowRoad, Node, roads, StartNode } from '../material/Road'

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

  getLegalMoves() {
    const stockArrows = this.arrows.location(LocationType.ArrowsStock)
    if (!stockArrows.length) return []
    const expeditionArrows = this.arrows.location(LocationType.Road).getItems()
    return this.getNextArrowOrigin().flatMap(node =>
      roads.filter(road => (road[0] === node || road[1] === node) && !expeditionArrows.some(arrow => equal(arrow.location.id, road)))
        .map(road => stockArrows.moveItem({ type: LocationType.Road, id: road, rotation: road[1] === node }))
    )
  }

  getNextArrowOrigin(): Node[] {
    const arrows = this.arrows.location(LocationType.Road).getItems()
    const lastArrow = this.lastArrow.getItem()
    return lastArrow ? [arrowRoad(lastArrow.location)[1]] : [...new Set(arrows.map(arrow => arrowRoad(arrow.location)[1]).concat(StartNode))]
  }

  get lastArrow(): Material {
    const arrows = this.arrows.location(LocationType.Road).getItems()
    return this.arrows.location(LocationType.Road).location(location => {
      const destination = arrowRoad(location)[1]
      return !arrows.some(otherArrow => arrowRoad(otherArrow.location)[0] === destination)
    })
  }

  get loop(): boolean {
    return this.started && !this.isOver && !this.lastArrow.length
  }
}

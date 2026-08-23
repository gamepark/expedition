import Color from '@gamepark/expedition/Color'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { Road } from '@gamepark/expedition/material/Road'
import { DropAreaDescription, MaterialContext } from '@gamepark/react-game'
import { isMoveItemType, Location, MaterialGame, XYCoordinates } from '@gamepark/rules-api'
import { boardDescription, boardRatio } from '../material/BoardDescription'
import { nodesCoordinates } from './PlaceLocator'
import { RoadHelp } from './RoadHelp'

export class RoadDescription extends DropAreaDescription<Color, MaterialType, LocationType> {
  help = RoadHelp
  borderRadius = 1

  /**
   * The framework lights up a drop area only when a single legal move leads to it, so that a click on it
   * is unambiguous (see SimpleDropArea). On this board that hides the roads that matter most: a road two
   * arrows may take is where the player has a choice to make, and a click on it opens {@link RoadHelp} to
   * make it. So the roads are lit on the only criterion the map cares about - an arrow can go there.
   */
  highlight(location: Location<Color, LocationType, Road>, context: MaterialContext<Color, MaterialType, LocationType>): boolean {
    return this.getPlayableRoads(context).has(roadKey(location.id!))
  }

  /**
   * Close to 200 roads ask this same question of the same state, so the answer is computed once and kept
   * until the state changes. Identity of the state is the whole cache key: the store hands out a new
   * object on every change, and legal moves cannot change without it.
   */
  private playableRoads?: { game: MaterialGame<Color, MaterialType, LocationType>, roads: Set<string> }

  private getPlayableRoads({ rules, player }: MaterialContext<Color, MaterialType, LocationType>): Set<string> {
    if (this.playableRoads?.game !== rules.game) {
      const roads = new Set<string>()
      // A spectator has no legal moves, and neither has a player waiting for their turn: nothing lights up.
      if (player !== undefined) {
        for (const move of rules.getLegalMoves(player)) {
          if (isMoveItemType(MaterialType.Arrow)(move) && move.location.type === LocationType.Road) {
            roads.add(roadKey(move.location.id))
          }
        }
      }
      this.playableRoads = { game: rules.game, roads }
    }
    return this.playableRoads.roads
  }

  getSize(road: Road) {
    const coordinates = this.getRoadCoordinates(road)
    const distance = Math.hypot((coordinates[1].x - coordinates[0].x) * boardRatio, (coordinates[1].y - coordinates[0].y))
    return { width: 2, height: (distance - 3) * boardDescription.height / 100 }
  }

  getRoadCoordinates(road: Road): [XYCoordinates, XYCoordinates] {
    const coordinates: [XYCoordinates, XYCoordinates] = [nodesCoordinates[road[0]], nodesCoordinates[road[1]]]
    // 3 red nodes are links between the left & right sides of the board
    if (coordinates[0].x > 50 && coordinates[1].x < 1) {
      coordinates[1] = { x: 99.95, y: coordinates[1].y }
    } else if (coordinates[1].x > 50 && coordinates[0].x < 1) {
      coordinates[0] = { x: 99.95, y: coordinates[0].y }
    }
    return coordinates
  }

  getRotateZ(location: Location<Color, LocationType, Road>) {
    return this.getAngle(this.getRoadCoordinates(location.id!))
  }

  getAngle(coordinates: [XYCoordinates, XYCoordinates]): number {
    return -Math.atan2((coordinates[0].x - coordinates[1].x) * boardRatio, coordinates[0].y - coordinates[1].y)
  }
}

/**
 * A road identifies a location by its 2 nodes, and the one carried by a move has been through the store:
 * it is an equal array, never the same one, so roads are matched on their value.
 */
const roadKey = (road: Road) => `${road[0]}-${road[1]}`

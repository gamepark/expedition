/** @jsxImportSource @emotion/react */
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { isCustomMove, Location, MaterialMove } from '@gamepark/rules-api'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { CustomMoveType } from '@gamepark/expedition/rules/CustomMoveType'

export class PlayerHandDescription extends LocationDescription<Color, MaterialType, LocationType> {
  location = { type: LocationType.Hand }
  width = 60
  height = 11
  borderRadius = 0.5
  coordinates = { x: 0, y: 0, z: 20 }

  getCoordinates(_location: Location<Color, LocationType>, { game, player }: MaterialContext<Color, MaterialType, LocationType>) {
    const cards = new ExpeditionRules(game).material(MaterialType.Card).location(LocationType.Hand).player(player).length
    return { x: -55 + cards * 3, y: 28.5, z: 20 }
  }

  canDrop(move: MaterialMove): boolean {
    return isCustomMove(move, CustomMoveType.ExchangeCard)
  }
}

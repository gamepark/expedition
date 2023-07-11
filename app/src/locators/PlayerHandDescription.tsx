/** @jsxImportSource @emotion/react */
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { Location } from '@gamepark/rules-api'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'

export class PlayerHandDescription extends LocationDescription<Color, MaterialType, LocationType> {
  locations = [{ type: LocationType.Hand }]
  width = 60
  height = 11
  borderRadius = 0.5
  coordinates = { x: 0, y: 0, z: 20 }

  getCoordinates(_location: Location<Color, LocationType>, { game, player }: MaterialContext<Color, MaterialType, LocationType>) {
    const cards = new ExpeditionRules(game).material(MaterialType.Card).location(LocationType.Hand).player(player).length
    return { x: -55 + cards * 3, y: 28.5, z: 20 }
  }
}

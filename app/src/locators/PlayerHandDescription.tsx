/** @jsxImportSource @emotion/react */
import Color from '@gamepark/expedition/Color'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayerHandDescription extends LocationDescription<Color, MaterialType, LocationType> {
  width = 60
  height = 11
  borderRadius = 0.5

  getCoordinates(_location: Location<Color, LocationType>, { rules, player }: MaterialContext<Color, MaterialType, LocationType>) {
    const cards = rules.material(MaterialType.Card).location(LocationType.Hand).player(player).length
    return { x: -55 + cards * 3, y: 28.5, z: 20 }
  }
}

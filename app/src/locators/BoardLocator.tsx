/** @jsxImportSource @emotion/react */
import { ItemLocator } from '@gamepark/react-game'
import { Coordinates } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'

export class BoardLocator extends ItemLocator<Color, MaterialType, LocationType> {

  getPosition(): Coordinates {
    return { x: -10, y: -5, z: 0 }
  }
}

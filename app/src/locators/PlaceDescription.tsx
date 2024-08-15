/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Color from '@gamepark/expedition/Color'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { isGreenNode, Node, StartNode } from '@gamepark/expedition/material/Road'
import { DropAreaDescription, MaterialContext } from '@gamepark/react-game'
import { Location, Material } from '@gamepark/rules-api'
import { PlaceHelp } from './PlaceHelp'

export class PlaceDescription extends DropAreaDescription<Color, MaterialType, LocationType> {
  width = 1.8
  ratio = 1
  borderRadius = this.width / 2
  help = PlaceHelp

  getSize(node: Node) {
    return node === StartNode ? { width: 3, height: 3 } : super.getSize(node)
  }

  getExtraCss(location: Location<Color, LocationType>, { rules }: MaterialContext<Color, MaterialType, LocationType>) {
    const borderColor = this.getObjectiveColor(rules.material(MaterialType.Card), location.id)
    return borderColor && borderCss(borderColor)
  }

  getObjectiveColor(cards: Material<Color>, place?: Node) {
    if (!place || !isGreenNode(place)) return
    const card = cards.id(place).getItem()
    switch (card?.location.type) {
      case LocationType.CommonObjectives:
        return 'purple'
      case LocationType.Hand:
        return playerColorCode[card?.location.player!]
      default:
        return
    }
  }
}

export const playerColorCode: Record<Color, string> = {
  [Color.Red]: '#E75035',
  [Color.Pink]: '#F19FC5',
  [Color.Blue]: '#21BBEF',
  [Color.Green]: '#AFCB54',
  [Color.Yellow]: '#FED061',
  [Color.White]: '#FFFFFF'
}

const borderCss = (color: string) => css`
  border: 0.2em solid ${color}
`

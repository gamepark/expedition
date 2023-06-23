/** @jsxImportSource @emotion/react */
import { ItemLocator, LocationRulesProps } from '@gamepark/react-game'
import { Location, Material, MaterialRules, XYCoordinates } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { Place } from '@gamepark/expedition/material/Place'
import { css } from '@emotion/react'
import { BlueNode, isGreenNode, Node, nodes, RedNode, StartNode } from '@gamepark/expedition/material/Road'
import { ReactNode } from 'react'
import { PlaceRules } from './PlaceRules'

export class PlaceLocator extends ItemLocator<Color, MaterialType, LocationType> {
  parentItemType = MaterialType.Board

  getLocations(): Location<Color, LocationType, Node>[] {
    return nodes.map<Location>(place => ({ type: LocationType.Place, id: place })).concat([
      { type: LocationType.Place, id: RedNode.CraterLake_NorthWest, x: 1 },
      { type: LocationType.Place, id: RedNode.Teotihuacan_SouthWest, x: 1 },
      { type: LocationType.Place, id: RedNode.RapaNui_South, x: 1 }
    ])
  }

  getLocationCss(location: Location<Color, LocationType, Node>, rules: MaterialRules<Color, MaterialType, LocationType>) {
    const borderColor = this.getObjectiveColor(rules.material(MaterialType.Card), location.id)
    return [locationCss, borderColor && borderCss(borderColor)]
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

  getPositionOnParent(location: Location<Color, LocationType, Place>): XYCoordinates {
    const coordinates = nodesCoordinates[location.id!]
    if (location.x === 1) return { x: 99.8, y: coordinates.y }
    return coordinates
  }

  getLocationRules(props: LocationRulesProps<Color, MaterialType, LocationType>): ReactNode {
    return <PlaceRules {...props}/>
  }
}

export const nodesCoordinates: Record<Node, XYCoordinates> = {
  [StartNode]: { x: 46.9, y: 15.9 },
  [Place.Denali]: { x: 6.55, y: 6.4 },
  [Place.MackenzieDelta]: { x: 14.2, y: 2.5 },
  [Place.NorthwestPassage]: { x: 28, y: 7.05 },
  [Place.Banff]: { x: 12.8, y: 14.6 },
  [Place.CraterLake]: { x: 6.7, y: 16.15 },
  [Place.OldFaithful]: { x: 9.9, y: 19.1 },
  [Place.PuertoRico]: { x: 20.5, y: 40.25 },
  [Place.GrandCanyon]: { x: 6.55, y: 26.6 },
  [Place.NiagaraFalls]: { x: 20.9, y: 22.2 },
  [Place.Louisiane]: { x: 14.48, y: 31.55 },
  [Place.Teotihuacan]: { x: 8.92, y: 38.98 },
  [Place.Tikal]: { x: 13.5, y: 41.4 },
  [Place.Newfoundland]: { x: 30.6, y: 19.1 },
  [Place.Greenland]: { x: 36.6, y: 2.05 },
  [Place.SaltoAngel]: { x: 20.85, y: 48.7 },
  [Place.Marajo]: { x: 26.4, y: 54.5 },
  [Place.AmazonRainforest]: { x: 22.45, y: 57.75 },
  [Place.MachuPicchu]: { x: 16, y: 62.3 },
  [Place.Aripuana]: { x: 24.1, y: 63.4 },
  [Place.SalvadorDeBahia]: { x: 30.9, y: 64.5 },
  [Place.Altiplano]: { x: 20.65, y: 68.25 },
  [Place.IguazuFalls]: { x: 25.05, y: 72.65 },
  [Place.Atacama]: { x: 20.12, y: 78.3 },
  [Place.GalapagosIslands]: { x: 8.9, y: 54.25 },
  [Place.PacificOcean]: { x: 4.15, y: 64.5 },
  [Place.RapaNui]: { x: 3.3, y: 78.35 },
  [Place.TierraDelFuego]: { x: 22.98, y: 92.08 },
  [Place.GrahamLand]: { x: 32.52, y: 98.25 },
  [Place.Svalbard]: { x: 48, y: 1.6 },
  [Place.Thingvellir]: { x: 42.43, y: 8.3 },
  [Place.Stonehenge]: { x: 40.9, y: 18.4 },
  [Place.Rome]: { x: 46.3, y: 25.1 },
  [Place.Athens]: { x: 50.6, y: 28.6 },
  [Place.Timgad]: { x: 43.63, y: 30.05 },
  [Place.CanaryIslands]: { x: 34.5, y: 34.9 },
  [Place.Sahara]: { x: 47.4, y: 39.1 },
  [Place.Gizeh]: { x: 52.6, y: 33.5 },
  [Place.Tombouctou]: { x: 40, y: 41.45 },
  [Place.Koush]: { x: 53.4, y: 45.6 },
  [Place.Aksoum]: { x: 57.53, y: 44.45 },
  [Place.Elmina]: { x: 40.1, y: 51 },
  [Place.Douala]: { x: 45.9, y: 53.3 },
  [Place.Virunga]: { x: 53.95, y: 56.45 },
  [Place.VictoriaFalls]: { x: 52.4, y: 68.2 },
  [Place.Omatako]: { x: 48.7, y: 69.88 },
  [Place.AtlanticOcean]: { x: 46.3, y: 78.7 },
  [Place.Madagascar]: { x: 62.1, y: 69.15 },
  [Place.IndienOcean]: { x: 53.8, y: 84 },
  [Place.Petra]: { x: 56.4, y: 33.4 },
  [Place.Babylone]: { x: 63.1, y: 29.95 },
  [Place.Persepolis]: { x: 64.25, y: 33.6 },
  [Place.Sanaa]: { x: 61.3, y: 44.2 },
  [Place.CaspianSea]: { x: 61.25, y: 22.2 },
  [Place.Zagorsk]: { x: 59.2, y: 12.2 },
  [Place.PutoranaPlateau]: { x: 67.9, y: 3.5 },
  [Place.Novossibirsk]: { x: 67.9, y: 18.45 },
  [Place.Harappa]: { x: 70.25, y: 30 },
  [Place.Sakha]: { x: 78.17, y: 6 },
  [Place.LakeBaikal]: { x: 81.53, y: 13.5 },
  [Place.GreatWallOfChina]: { x: 86.95, y: 25.23 },
  [Place.MountEverest]: { x: 78.5, y: 32.1 },
  [Place.TajMahal]: { x: 74.9, y: 37.4 },
  [Place.Sigiriya]: { x: 77.4, y: 49.95 },
  [Place.Bagan]: { x: 82.1, y: 41.5 },
  [Place.AngkorVat]: { x: 85.4, y: 47.1 },
  [Place.Xian]: { x: 88.2, y: 30 },
  [Place.AmurRiver]: { x: 91.5, y: 15.4 },
  [Place.Kolyma]: { x: 86.5, y: 3.8 },
  [Place.BeringStraitCrossing]: { x: 97.95, y: 3.85 },
  [Place.MountFuji]: { x: 98.1, y: 26.2 },
  [Place.Borobudur]: { x: 85.7, y: 63.9 },
  [Place.Sulawesi]: { x: 90.5, y: 59.9 },
  [Place.PapuaNewGuinea]: { x: 98.3, y: 68.85 },
  [Place.ArnhemLand]: { x: 90.5, y: 72.7 },
  [Place.BungleBungleRange]: { x: 87.6, y: 77.25 },
  [Place.GreatBarrierReef]: { x: 96.55, y: 78.75 },
  [Place.Uluru]: { x: 88.15, y: 84 },
  [Place.Perth]: { x: 79.6, y: 86.65 },
  [Place.Tasmania]: { x: 87.4, y: 96.2 },
  [Place.FiordlandNationalPark]: { x: 94.45, y: 96.5 },
  [BlueNode.NorthwestPassage_West]: { x: 21.7, y: 2.1 },
  [BlueNode.Thingvellir_West]: { x: 34.2, y: 11.55 },
  [BlueNode.Newfoundland_South]: { x: 27.1, y: 29.05 },
  [BlueNode.Rome_West]: { x: 38.4, y: 24.8 },
  [BlueNode.Elmina_West]: { x: 32.8, y: 52.3 },
  [BlueNode.Elmiha_South_South]: { x: 38.05, y: 72.2 },
  [BlueNode.IguazuFalls_South]: { x: 24.93, y: 81.93 },
  [BlueNode.RapaNui_South_SouthEast]: { x: 6.4, y: 93.1 },
  [BlueNode.Elmiha_South_South_South_South]: { x: 38.6, y: 89.9 },
  [BlueNode.GrahamLand_East]: { x: 42.12, y: 97.68 },
  [BlueNode.IndienOcean_SouthWest_SouthEast]: { x: 52.6, y: 97.1 },
  [BlueNode.Madagascar_South_South]: { x: 63.92, y: 88.27 },
  [BlueNode.Sanaa_South_SouthEast]: { x: 68.85, y: 62.9 },
  [BlueNode.Sanaa_South_SouthWest]: { x: 58.7, y: 59.2 },
  [BlueNode.StartNode_East]: { x: 54.35, y: 20.6 },
  [BlueNode.Novossibirsk_East]: { x: 75.5, y: 20.9 },
  [BlueNode.Sigiriya_South_South]: { x: 76.9, y: 72.2 },
  [BlueNode.Perth_South]: { x: 78.4, y: 96.7 },
  [BlueNode.PapuaNewGuinea_North]: { x: 96.8, y: 59.25 },
  [BlueNode.MountFuji_South]: { x: 96.2, y: 38.7 },
  [RedNode.CraterLake_NorthWest]: { x: 0.2, y: 10.1 },
  [RedNode.Newfoundland_West]: { x: 23, y: 13.9 },
  [RedNode.Tombouctou_West]: { x: 27.9, y: 40.1 },
  [RedNode.Teotihuacan_SouthWest]: { x: 0.2, y: 50.3 },
  [RedNode.Atacama_West]: { x: 11.45, y: 74 },
  [RedNode.RapaNui_South]: { x: 0.2, y: 85.9 },
  [RedNode.SaltoAngel_West]: { x: 14.8, y: 52.35 },
  [RedNode.TierraDelFuego_West]: { x: 15.3, y: 96.2 },
  [RedNode.Elmiha_South]: { x: 38.55, y: 61.05 },
  [RedNode.Douala_South]: { x: 48.3, y: 61.2 },
  [RedNode.Elmiha_South_South_South]: { x: 34.7, y: 81.2 },
  [RedNode.IndienOcean_SouthWest]: { x: 47.33, y: 89.25 },
  [RedNode.Madagascar_South_South_South]: { x: 60.98, y: 96.68 },
  [RedNode.Madagascar_South_South_SouthEast]: { x: 70.13, y: 95.65 },
  [RedNode.Madagascar_South]: { x: 60.6, y: 78.7 },
  [RedNode.Sigiriya_South_South_South]: { x: 71.15, y: 81.95 },
  [RedNode.Sigiriya_South]: { x: 76.6, y: 61.25 },
  [RedNode.Sanaa_South]: { x: 65.25, y: 52.35 },
  [RedNode.Svalbard_East]: { x: 56.9, y: 3.6 },
  [RedNode.PutoranaPlateau_SouthEast]: { x: 73.32, y: 11.6 },
  [RedNode.AngkorVat_East]: { x: 93.18, y: 51.32 }
}

export const playerColorCode: Record<Color, string> = {
  [Color.Red]: '#E75035',
  [Color.Pink]: '#F19FC5',
  [Color.Blue]: '#21BBEF',
  [Color.Green]: '#AFCB54',
  [Color.Yellow]: '#FED061',
  [Color.White]: '#FFFFFF'
}

const locationCss = css`
  height: 1.8em;
  width: 1.8em;
  border-radius: 50%;
`

const borderCss = (color: string) => css`
  border: 0.2em solid ${color}
`

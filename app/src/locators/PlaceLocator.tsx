/** @jsxImportSource @emotion/react */
import { ItemLocator, LocationRulesProps } from '@gamepark/react-game'
import { Location, Material, XYCoordinates } from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { Place } from '@gamepark/expedition/material/Place'
import { css } from '@emotion/react'
import { BlueNode, isGreenNode, Node, nodes, RedNode, StartNode } from '@gamepark/expedition/material/Road'
import { ExpeditionRules } from '@gamepark/expedition/ExpeditionRules'
import { ReactNode } from 'react'
import { PlaceRules } from './PlaceRules'

export class PlaceLocator extends ItemLocator<Color, MaterialType, LocationType> {
  parentItemType = MaterialType.Board

  getParentItemLocations(): Location<Color, LocationType, Node>[] {
    return nodes.map(place => ({ type: LocationType.Place, id: place }))
  }

  getLocationCss(location: Location<Color, LocationType, Node>, rules: ExpeditionRules) {
    const borderColor = this.getObjectiveColor(rules.material(MaterialType.Card), location.id)
    return [locationCss, borderColor && borderCss(borderColor)]
  }

  getObjectiveColor(cards: Material, place?: Node) {
    if (!place || !isGreenNode(place)) return
    const commonObjectives = cards.location(LocationType.CommonObjectives).getItems<Place>(card => card.id)
    if (commonObjectives.includes(place)) return 'purple'
    if (!this.player) return
    const playerObjectives = cards.location(LocationType.Hand).player(this.player).getItems<Place>(card => card.id)
    if (playerObjectives.includes(place)) {
      return playerColorCode[this.player!]
    }
    return
  }

  getPositionOnParent(location: Location<Color, LocationType, Place>): XYCoordinates {
    return nodesCoordinates[location.id!]
  }

  getLocationRules(props: LocationRulesProps<Color, MaterialType, LocationType>): ReactNode {
    return <PlaceRules {...props}/>
  }
}

export const nodesCoordinates: Record<Node, XYCoordinates> = {
  [StartNode]: { x: 46.9, y: 16.1 },
  [Place.Denali]: { x: 6.6, y: 6.52 },
  [Place.MackenzieDelta]: { x: 14.3, y: 2.75 },
  [Place.NorthwestPassage]: { x: 28.05, y: 7.25 },
  [Place.Banff]: { x: 12.88, y: 14.7 },
  [Place.CraterLake]: { x: 6.8, y: 16.3 },
  [Place.OldFaithful]: { x: 10, y: 19.25 },
  [Place.PuertoRico]: { x: 20.6, y: 40.3 },
  [Place.GrandCanyon]: { x: 6.61, y: 26.75 },
  [Place.NiagaraFalls]: { x: 20.95, y: 22.3 },
  [Place.Louisiane]: { x: 14.6, y: 31.7 },
  [Place.Teotihuacan]: { x: 9, y: 39 },
  [Place.Tikal]: { x: 13.6, y: 41.5 },
  [Place.Newfoundland]: { x: 30.65, y: 19.2 },
  [Place.Greenland]: { x: 36.62, y: 2.23 },
  [Place.SaltoAngel]: { x: 20.95, y: 48.8 },
  [Place.Marajo]: { x: 26.4, y: 54.5 },
  [Place.AmazonRainforest]: { x: 22.45, y: 57.75 },
  [Place.MachuPicchu]: { x: 16, y: 62.3 },
  [Place.Aripuana]: { x: 24.2, y: 63.5 },
  [Place.SalvadorDeBahia]: { x: 30.9, y: 64.5 },
  [Place.Altiplano]: { x: 20.65, y: 68.25 },
  [Place.IguazuFalls]: { x: 25.05, y: 72.65 },
  [Place.Atacama]: { x: 20.2, y: 78.3 },
  [Place.GalapagosIslands]: { x: 9, y: 54.4 },
  [Place.PacificOcean]: { x: 4.2, y: 64.5 },
  [Place.RapaNui]: { x: 3.4, y: 78.35 },
  [Place.TierraDelFuego]: { x: 22.98, y: 92.08 },
  [Place.GrahamLand]: { x: 32.52, y: 98.25 },
  [Place.Svalbard]: { x: 48, y: 1.8 },
  [Place.Thingvellir]: { x: 42.43, y: 8.4 },
  [Place.Stonehenge]: { x: 40.9, y: 18.5 },
  [Place.Rome]: { x: 46.35, y: 25.25 },
  [Place.Athens]: { x: 50.65, y: 28.8 },
  [Place.Timgad]: { x: 43.63, y: 30.05 },
  [Place.CanaryIslands]: { x: 34.5, y: 34.9 },
  [Place.Sahara]: { x: 47.4, y: 39.15 },
  [Place.Gizeh]: { x: 52.65, y: 33.65 },
  [Place.Tombouctou]: { x: 40.05, y: 41.55 },
  [Place.Koush]: { x: 53.4, y: 45.6 },
  [Place.Aksoum]: { x: 57.55, y: 44.55 },
  [Place.Elmina]: { x: 40.1, y: 51 },
  [Place.Douala]: { x: 45.9, y: 53.3 },
  [Place.Virunga]: { x: 53.95, y: 56.45 },
  [Place.VictoriaFalls]: { x: 52.4, y: 68.3 },
  [Place.Omatako]: { x: 48.7, y: 69.88 },
  [Place.AtlanticOcean]: { x: 46.3, y: 78.7 },
  [Place.Madagascar]: { x: 62.1, y: 69.15 },
  [Place.IndienOcean]: { x: 53.8, y: 84 },
  [Place.Petra]: { x: 56.45, y: 33.5 },
  [Place.Babylone]: { x: 63.1, y: 30.05 },
  [Place.Persepolis]: { x: 64.25, y: 33.75 },
  [Place.Sanaa]: { x: 61.3, y: 44.3 },
  [Place.CaspianSea]: { x: 61.3, y: 22.3 },
  [Place.Zagorsk]: { x: 59.2, y: 12.35 },
  [Place.PutoranaPlateau]: { x: 67.9, y: 3.7 },
  [Place.Novossibirsk]: { x: 67.9, y: 18.55 },
  [Place.Harappa]: { x: 70.28, y: 30.13 },
  [Place.Sakha]: { x: 78.17, y: 6.13 },
  [Place.LakeBaikal]: { x: 81.53, y: 13.68 },
  [Place.GreatWallOfChina]: { x: 86.95, y: 25.23 },
  [Place.MountEverest]: { x: 78.5, y: 32.2 },
  [Place.TajMahal]: { x: 74.9, y: 37.5 },
  [Place.Sigiriya]: { x: 77.4, y: 49.95 },
  [Place.Bagan]: { x: 82.1, y: 41.5 },
  [Place.AngkorVat]: { x: 85.4, y: 47.2 },
  [Place.Xian]: { x: 88.2, y: 30.1 },
  [Place.AmurRiver]: { x: 91.5, y: 15.5 },
  [Place.Kolyma]: { x: 86.5, y: 4 },
  [Place.BeringStraitCrossing]: { x: 97.95, y: 4 },
  [Place.MountFuji]: { x: 98.1, y: 26.3 },
  [Place.Borobudur]: { x: 85.7, y: 63.9 },
  [Place.Sulawesi]: { x: 90.5, y: 59.9 },
  [Place.PapuaNewGuinea]: { x: 98.3, y: 68.85 },
  [Place.ArnhemLand]: { x: 90.45, y: 72.75 },
  [Place.BungleBungleRange]: { x: 87.6, y: 77.25 },
  [Place.GreatBarrierReef]: { x: 96.55, y: 78.75 },
  [Place.Uluru]: { x: 88.15, y: 84 },
  [Place.Perth]: { x: 79.6, y: 86.65 },
  [Place.Tasmania]: { x: 87.4, y: 96.2 },
  [Place.FiordlandNationalPark]: { x: 94.45, y: 96.5 },
  [BlueNode.NorthwestPassage_West]: { x: 21.75, y: 2.25 },
  [BlueNode.Thingvellir_West]: { x: 34.25, y: 11.8 },
  [BlueNode.Newfoundland_South]: { x: 27.2, y: 29.15 },
  [BlueNode.Rome_West]: { x: 38.45, y: 24.95 },
  [BlueNode.Elmina_West]: { x: 33, y: 52.3 },
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
  [BlueNode.Novossibirsk_East]: { x: 75.55, y: 21 },
  [BlueNode.Sigiriya_South_South]: { x: 76.9, y: 72.2 },
  [BlueNode.Perth_South]: { x: 78.4, y: 96.7 },
  [BlueNode.PapuaNewGuinea_North]: { x: 96.8, y: 59.25 },
  [BlueNode.MountFuji_South]: { x: 96.2, y: 38.7 },
  [RedNode.CraterLake_NorthWest]: { x: 0.1, y: 10.2 },
  [RedNode.Newfoundland_West]: { x: 23.05, y: 13.95 },
  [RedNode.Tombouctou_West]: { x: 27.95, y: 40.15 },
  [RedNode.Teotihuacan_SouthWest]: { x: 0.1, y: 50.3 },
  [RedNode.Atacama_West]: { x: 11.5, y: 73.9 },
  [RedNode.RapaNui_South]: { x: 0.1, y: 85.9 },
  [RedNode.SaltoAngel_West]: { x: 14.8, y: 52.35 },
  [RedNode.TierraDelFuego_West]: { x: 15.3, y: 96.2 },
  [RedNode.Elmiha_South]: { x: 38.55, y: 61.05 },
  [RedNode.Douala_South]: { x: 48.35, y: 61.25 },
  [RedNode.Elmiha_South_South_South]: { x: 34.7, y: 81.2 },
  [RedNode.IndienOcean_SouthWest]: { x: 47.33, y: 89.25 },
  [RedNode.Madagascar_South_South_South]: { x: 60.98, y: 96.68 },
  [RedNode.Madagascar_South_South_SouthEast]: { x: 70.13, y: 95.65 },
  [RedNode.Madagascar_South]: { x: 60.6, y: 78.7 },
  [RedNode.Sigiriya_South_South_South]: { x: 71.15, y: 81.95 },
  [RedNode.Sigiriya_South]: { x: 76.6, y: 61.25 },
  [RedNode.Sanaa_South]: { x: 65.25, y: 52.35 },
  [RedNode.Svalbard_East]: { x: 56.9, y: 3.7 },
  [RedNode.PutoranaPlateau_SouthEast]: { x: 73.32, y: 11.73 },
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
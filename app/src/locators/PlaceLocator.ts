import {ItemLocator} from '@gamepark/react-components'
import {Coordinates, Location} from '@gamepark/rules-api'
import Color from '@gamepark/expedition/Color'
import {MaterialType} from '@gamepark/expedition/material/ExpeditionMaterial'
import {LocationType} from '@gamepark/expedition/material/ExpeditionLocations'
import {Place} from '@gamepark/expedition/material/Place'
import {css} from '@emotion/react'
import {BlueNode, isGreenNode, Node, nodes, RedNode, StartNode} from '@gamepark/expedition/material/Road'

export class PlaceLocator extends ItemLocator<Color, MaterialType, LocationType> {
  parentItemType = MaterialType.Board

  getParentItemLocations(): Location<Color, LocationType, Node>[] {
    return nodes.map(place => ({type: LocationType.Place, id: place}))
  }

  getLocationCss(location: Location<Color, LocationType, Node>) {
    const borderColor = this.getObjectiveColor(location.id)
    return [locationCss, borderColor && borderCss(borderColor)]
  }

  getObjectiveColor(place?: Node) {
    if (!place || !isGreenNode(place)) return
    const commonObjectives = this.getMaterial(MaterialType.Card).search().location(LocationType.CommonPlacesArea).all()
      .map<Place>(card => card.id as Place)
    if (commonObjectives.includes(place)) return 'purple'
    if (!this.player) return
    const playerObjectives = this.getMaterial(MaterialType.Card).search().location(LocationType.Hand).player(this.player).all()
      .map<Place>(card => card.id as Place)
    if (playerObjectives.includes(place)) {
      return playerColorCode[this.player!]
    }
    return
  }

  getPositionOnParent(location: Location<Color, LocationType, Place>): Omit<Coordinates, 'z'> {
    return nodesCoordinates[location.id!]
  }
}

export const nodesCoordinates: Record<Node, Omit<Coordinates, 'z'>> = {
  [StartNode]: {x: 46.9, y: 16.1},
  [Place.Denali]: {x: 6.7, y: 6.6},
  [Place.MackenzieDelta]: {x: 14.3, y: 2.75},
  [Place.NorthwestPassage]: {x: 28.05, y: 7.25},
  [Place.Banff]: {x: 12.9, y: 14.8},
  [Place.CraterLake]: {x: 6.8, y: 16.3},
  [Place.OldFaithful]: {x: 10, y: 19.2},
  [Place.PuertoRico]: {x: 20.6, y: 40.3},
  [Place.GrandCanyon]: {x: 6.6, y: 26.8},
  [Place.NiagaraFalls]: {x: 21, y: 22.4},
  [Place.Louisiane]: {x: 14.6, y: 31.7},
  [Place.Teotihuacan]: {x: 9, y: 39},
  [Place.Tikal]: {x: 13.6, y: 41.5},
  [Place.Newfoundland]: {x: 30.65, y: 19.25},
  [Place.Greenland]: {x: 36.6, y: 2.3},
  [Place.SaltoAngel]: {x: 21, y: 48.8},
  [Place.Marajo]: {x: 26.4, y: 54.5},
  [Place.AmazonRainforest]: {x: 22.5, y: 57.8},
  [Place.MachuPicchu]: {x: 16, y: 62.3},
  [Place.Aripuana]: {x: 24.2, y: 63.5},
  [Place.SalvadorDeBahia]: {x: 30.9, y: 64.5},
  [Place.Altiplano]: {x: 20.7, y: 68.3},
  [Place.IguazuFalls]: {x: 25.1, y: 72.7},
  [Place.Atacama]: {x: 20.2, y: 78.3},
  [Place.GalapagosIslands]: {x: 9, y: 54.4},
  [Place.PacificOcean]: {x: 4.2, y: 64.5},
  [Place.RapaNui]: {x: 3.4, y: 78.35},
  [Place.TierraDelFuego]: {x: 23, y: 92.05},
  [Place.GrahamLand]: {x: 32.55, y: 98.2},
  [Place.Svalbard]: {x: 48, y: 1.8},
  [Place.Thingvellir]: {x: 42.5, y: 8.5},
  [Place.Stonehenge]: {x: 40.9, y: 18.5},
  [Place.Rome]: {x: 46.4, y: 25.3},
  [Place.Athens]: {x: 50.65, y: 28.8},
  [Place.Timgad]: {x: 43.6, y: 30.1},
  [Place.CanaryIslands]: {x: 34.5, y: 34.9},
  [Place.Sahara]: {x: 47.4, y: 39.15},
  [Place.Gizeh]: {x: 52.6, y: 33.7},
  [Place.Tombouctou]: {x: 40.05, y: 41.55},
  [Place.Koush]: {x: 53.4, y: 45.7},
  [Place.Aksoum]: {x: 57.5, y: 44.6},
  [Place.Elmina]: {x: 40.1, y: 51},
  [Place.Douala]: {x: 45.9, y: 53.3},
  [Place.Virunga]: {x: 53.95, y: 56.4},
  [Place.VictoriaFalls]: {x: 52.4, y: 68.3},
  [Place.Omatako]: {x: 48.7, y: 70},
  [Place.AtlanticOcean]: {x: 46.3, y: 78.7},
  [Place.Madagascar]: {x: 62.1, y: 69.1},
  [Place.IndienOcean]: {x: 53.8, y: 84},
  [Place.Petra]: {x: 56.45, y: 33.5},
  [Place.Babylone]: {x: 63.1, y: 30.05},
  [Place.Persepolis]: {x: 64.25, y: 33.75},
  [Place.Sanaa]: {x: 61.3, y: 44.3},
  [Place.CaspianSea]: {x: 61.3, y: 22.3},
  [Place.Zagorsk]: {x: 59.2, y: 12.35},
  [Place.PutoranaPlateau]: {x: 67.9, y: 3.7},
  [Place.Novossibirsk]: {x: 67.9, y: 18.6},
  [Place.Harappa]: {x: 70.2, y: 30.2},
  [Place.Sakha]: {x: 78.2, y: 6.2},
  [Place.LakeBaikal]: {x: 81.5, y: 13.8},
  [Place.GreatWallOfChina]: {x: 87, y: 25.2},
  [Place.MountEverest]: {x: 78.5, y: 32.2},
  [Place.TajMahal]: {x: 74.9, y: 37.5},
  [Place.Sigiriya]: {x: 77.4, y: 49.9},
  [Place.Bagan]: {x: 82.2, y: 41.6},
  [Place.AngkorVat]: {x: 85.4, y: 47.3},
  [Place.Xian]: {x: 88.2, y: 30.1},
  [Place.AmurRiver]: {x: 91.5, y: 15.6},
  [Place.Kolyma]: {x: 86.5, y: 4},
  [Place.BeringStraitCrossing]: {x: 97.95, y: 4},
  [Place.MountFuji]: {x: 98.1, y: 26.3},
  [Place.Borobudur]: {x: 85.7, y: 64},
  [Place.Sulawesi]: {x: 90.5, y: 59.9},
  [Place.PapuaNewGuinea]: {x: 98.3, y: 68.9},
  [Place.ArnhemLand]: {x: 90.45, y: 72.8},
  [Place.BungleBungleRange]: {x: 87.6, y: 77.25},
  [Place.GreatBarrierReef]: {x: 96.6, y: 78.8},
  [Place.Uluru]: {x: 88.15, y: 84},
  [Place.Perth]: {x: 79.6, y: 86.65},
  [Place.Tasmania]: {x: 87.4, y: 96.3},
  [Place.FiordlandNationalPark]: {x: 94.45, y: 96.5},
  [BlueNode.MackenzieDelta_East]: {x: 21.8, y: 2.35},
  [BlueNode.Thingvellir_West]: {x: 34.25, y: 11.8},
  [BlueNode.Newfoundland_South]: {x: 27.2, y: 29.15},
  [BlueNode.Rome_West]: {x: 38.5, y: 25},
  [BlueNode.Elmina_West]: {x: 33, y: 52.3},
  [BlueNode.Omatako_West]: {x: 38.15, y: 72.3},
  [BlueNode.IguazuFalls_South]: {x: 25, y: 82},
  [BlueNode.TierraDelFuego_West_West]: {x: 6.4, y: 93.1},
  [BlueNode.GrahamLand_North]: {x: 38.6, y: 89.9},
  [BlueNode.GrahamLand_East]: {x: 42.1, y: 97.8},
  [BlueNode.GrahamLand_East_East]: {x: 52.6, y: 97.2},
  [BlueNode.Madagascar_South_South]: {x: 64, y: 88.3},
  [BlueNode.Madagascar_East]: {x: 68.9, y: 62.95},
  [BlueNode.Madagascar_North]: {x: 58.7, y: 59.2},
  [BlueNode.CaspianSea_West]: {x: 54.45, y: 20.65},
  [BlueNode.MountEverest_North]: {x: 75.55, y: 21},
  [BlueNode.BungleBungleRange_West]: {x: 76.9, y: 72.4},
  [BlueNode.Tasmania_West]: {x: 78.5, y: 96.75},
  [BlueNode.PapuaNewGuinea_North]: {x: 96.8, y: 59.4},
  [BlueNode.MountFuji_South]: {x: 96.1, y: 38.9},
  [RedNode.Denali_West]: {x: 0.1, y: 10.2}, // Right side: {x: 99.95, y: 10.15}
  [RedNode.Banff_East]: {x: 23.05, y: 13.95},
  [RedNode.PuertoRico_East]: {x: 28, y: 40.2},
  [RedNode.GalapagosIslands_West]: {x: 0.1, y: 50.3}, // Right side: {x: 99.95, y: 50.3}
  [RedNode.Atacama_West]: {x: 11.5, y: 73.9},
  [RedNode.RapaNui_South]: {x: 0.1, y: 85.9}, // Right side: {x: 99.95, y: 85.9}
  [RedNode.MachuPicchu_North]: {x: 14.8, y: 52.35},
  [RedNode.TierraDelFuego_West]: {x: 15.3, y: 96.2},
  [RedNode.Elmiha_South]: {x: 38.55, y: 61.05},
  [RedNode.Douala_South]: {x: 48.3, y: 61.2},
  [RedNode.IguazuFalls_South_West]: {x: 34.7, y: 81.2},
  [RedNode.IndienOcean_West]: {x: 47.3, y: 89.2},
  [RedNode.IndienOcean_South_East]: {x: 61, y: 96.65},
  [RedNode.Tasmania_West_West]: {x: 70.1, y: 95.6},
  [RedNode.Madagascar_South]: {x: 60.6, y: 78.7},
  [RedNode.Perth_West]: {x: 71.2, y: 81.9},
  [RedNode.Borobudur_West]: {x: 76.6, y: 61.25},
  [RedNode.Sanaa_South]: {x: 65.3, y: 52.35},
  [RedNode.Svalbard_East]: {x: 56.9, y: 3.7},
  [RedNode.Sakha_West]: {x: 73.3, y: 11.75},
  [RedNode.Sulawesi_East]: {x: 93.2, y: 51.3}
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
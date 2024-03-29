import { isEnumValue, Location } from '@gamepark/rules-api'
import { Place, places } from './Place'

export enum BlueNode {
  StartNode_East = 100,
  Rome_West,
  Thingvellir_West,
  Newfoundland_South,
  Novossibirsk_East,
  NorthwestPassage_West,
  Sanaa_South_SouthEast,
  Sanaa_South_SouthWest,
  Elmina_West,
  Elmiha_South_South,
  MountFuji_South,
  Sigiriya_South_South,
  Madagascar_South_South,
  Elmiha_South_South_South_South,
  IguazuFalls_South,
  PapuaNewGuinea_North,
  Perth_South,
  IndienOcean_SouthWest_SouthEast,
  GrahamLand_East,
  RapaNui_South_SouthEast,
}

export enum RedNode {
  Svalbard_East = 200,
  Newfoundland_West,
  PutoranaPlateau_SouthEast,
  Sanaa_South,
  Tombouctou_West,
  Douala_South,
  Elmiha_South,
  Sigiriya_South,
  CraterLake_NorthWest,
  AngkorVat_East,
  Madagascar_South,
  Elmiha_South_South_South,
  Teotihuacan_SouthWest,
  Sigiriya_South_South_South,
  SaltoAngel_West,
  Madagascar_South_South_SouthEast,
  Madagascar_South_South_South,
  IndienOcean_SouthWest,
  Atacama_West,
  RapaNui_South,
  TierraDelFuego_West,
}

export const StartNode = 0

export type Node = typeof StartNode | Place | BlueNode | RedNode

export const isGreenNode = (node: Node): node is Place => node > 0 && node < 100

export const isBlueNode = (node: Node): node is BlueNode => node >= 100 && node < 200

export const isRedNode = (node: Node): node is RedNode => node >= 200

export type Road = [Node, Node]

export const roads: Road[] = [
  [StartNode, Place.Svalbard],
  [StartNode, BlueNode.StartNode_East],
  [StartNode, Place.Athens],
  [StartNode, Place.Rome],
  [StartNode, Place.Stonehenge],
  [StartNode, Place.Thingvellir],
  [Place.Svalbard, RedNode.Svalbard_East],
  [BlueNode.StartNode_East, Place.Zagorsk],
  [BlueNode.StartNode_East, Place.CaspianSea],
  [Place.Athens, Place.Petra],
  [Place.Athens, Place.Giza],
  [Place.Athens, Place.Timgad],
  [Place.Rome, BlueNode.Rome_West],
  [Place.Stonehenge, Place.Newfoundland],
  [Place.Stonehenge, Place.Thingvellir],
  [Place.Thingvellir, BlueNode.Thingvellir_West],
  [Place.Thingvellir, Place.Greenland],
  [RedNode.Svalbard_East, Place.PutoranaPlateau],
  [RedNode.Svalbard_East, Place.Zagorsk],
  [Place.Zagorsk, Place.PutoranaPlateau],
  [Place.CaspianSea, Place.Novossibirsk],
  [Place.CaspianSea, Place.Babylone],
  [Place.Petra, Place.Babylone],
  [Place.Petra, Place.Persepolis],
  [Place.Petra, Place.Sanaa],
  [Place.Giza, Place.Aksum],
  [Place.Giza, Place.Sahara],
  [Place.Giza, Place.Timgad],
  [Place.Timgad, Place.Sahara],
  [Place.Timgad, Place.Timbuktu],
  [Place.Timgad, BlueNode.Rome_West],
  [BlueNode.Rome_West, Place.CanaryIslands],
  [BlueNode.Rome_West, Place.Newfoundland],
  [Place.Newfoundland, BlueNode.Newfoundland_South],
  [Place.Newfoundland, RedNode.Newfoundland_West],
  [Place.Newfoundland, BlueNode.Thingvellir_West],
  [BlueNode.Thingvellir_West, Place.NorthwestPassage],
  [Place.Greenland, Place.NorthwestPassage],
  [Place.PutoranaPlateau, Place.Sakha],
  [Place.PutoranaPlateau, RedNode.PutoranaPlateau_SouthEast],
  [Place.PutoranaPlateau, Place.Novossibirsk],
  [Place.Novossibirsk, BlueNode.Novossibirsk_East],
  [Place.Babylone, Place.Harappa],
  [Place.Persepolis, Place.TajMahal],
  [Place.Persepolis, Place.Sanaa],
  [Place.Sanaa, RedNode.Sanaa_South],
  [Place.Aksum, RedNode.Sanaa_South],
  [Place.Aksum, Place.Virunga],
  [Place.Sahara, Place.Kush],
  [Place.Sahara, Place.Douala],
  [Place.Timbuktu, Place.Elmina],
  [Place.Timbuktu, RedNode.Tombouctou_West],
  [Place.CanaryIslands, RedNode.Tombouctou_West],
  [BlueNode.Newfoundland_South, RedNode.Tombouctou_West],
  [BlueNode.Newfoundland_South, Place.NiagaraFalls],
  [RedNode.Newfoundland_West, Place.NiagaraFalls],
  [RedNode.Newfoundland_West, Place.Banff],
  [RedNode.Newfoundland_West, BlueNode.NorthwestPassage_West],
  [RedNode.Newfoundland_West, Place.NorthwestPassage],
  [Place.NorthwestPassage, BlueNode.NorthwestPassage_West],
  [Place.Sakha, Place.Kolyma],
  [Place.Sakha, Place.LakeBaikal],
  [Place.Sakha, RedNode.PutoranaPlateau_SouthEast],
  [RedNode.PutoranaPlateau_SouthEast, BlueNode.Novossibirsk_East],
  [BlueNode.Novossibirsk_East, Place.LakeBaikal],
  [BlueNode.Novossibirsk_East, Place.GreatWall],
  [BlueNode.Novossibirsk_East, Place.MountEverest],
  [Place.Harappa, Place.MountEverest],
  [Place.Harappa, Place.TajMahal],
  [Place.TajMahal, Place.Bagan],
  [Place.TajMahal, Place.Sigiriya],
  [RedNode.Sanaa_South, Place.Sigiriya],
  [RedNode.Sanaa_South, BlueNode.Sanaa_South_SouthEast],
  [RedNode.Sanaa_South, BlueNode.Sanaa_South_SouthWest],
  [Place.Virunga, Place.VictoriaFalls],
  [Place.Virunga, Place.Douala],
  [Place.Virunga, Place.Kush],
  [Place.Douala, RedNode.Douala_South],
  [Place.Douala, Place.Elmina],
  [Place.Elmina, RedNode.Elmiha_South],
  [Place.Elmina, BlueNode.Elmina_West],
  [RedNode.Tombouctou_West, BlueNode.Elmina_West],
  [RedNode.Tombouctou_West, Place.PuertoRico],
  [Place.NiagaraFalls, Place.Louisiane],
  [Place.NiagaraFalls, Place.OldFaithful],
  [Place.NiagaraFalls, Place.Banff],
  [Place.Banff, Place.CraterLake],
  [BlueNode.NorthwestPassage_West, Place.MackenzieDelta],
  [Place.Kolyma, Place.BeringStrait],
  [Place.Kolyma, Place.LakeBaikal],
  [Place.LakeBaikal, Place.AmurRiver],
  [Place.GreatWall, Place.AmurRiver],
  [Place.GreatWall, Place.MountFuji],
  [Place.MountEverest, Place.Xian],
  [Place.Bagan, Place.Xian],
  [Place.Bagan, Place.Sigiriya],
  [Place.Sigiriya, Place.AngkorVat],
  [Place.Sigiriya, RedNode.Sigiriya_South],
  [BlueNode.Sanaa_South_SouthEast, RedNode.Sigiriya_South],
  [BlueNode.Sanaa_South_SouthEast, Place.Madagascar],
  [BlueNode.Sanaa_South_SouthWest, Place.Madagascar],
  [BlueNode.Sanaa_South_SouthWest, Place.VictoriaFalls],
  [Place.VictoriaFalls, Place.Madagascar],
  [RedNode.Douala_South, Place.Omatako],
  [RedNode.Douala_South, RedNode.Elmiha_South],
  [RedNode.Elmiha_South, BlueNode.Elmiha_South_South],
  [RedNode.Elmiha_South, Place.SalvadorDeBahia],
  [RedNode.Elmiha_South, BlueNode.Elmina_West],
  [Place.PuertoRico, Place.Tikal],
  [Place.PuertoRico, Place.Louisiane],
  [Place.Louisiane, Place.Teotihuacan],
  [Place.OldFaithful, Place.GrandCanyon],
  [Place.CraterLake, Place.GrandCanyon],
  [Place.CraterLake, RedNode.CraterLake_NorthWest],
  [Place.CraterLake, Place.Denali],
  [Place.MackenzieDelta, Place.Denali],
  [Place.BeringStrait, RedNode.CraterLake_NorthWest],
  [Place.AmurRiver, RedNode.CraterLake_NorthWest],
  [Place.MountFuji, RedNode.CraterLake_NorthWest],
  [Place.MountFuji, BlueNode.MountFuji_South],
  [Place.Xian, BlueNode.MountFuji_South],
  [Place.AngkorVat, RedNode.AngkorVat_East],
  [Place.AngkorVat, Place.Sulawesi],
  [RedNode.Sigiriya_South, Place.Borobudur],
  [RedNode.Sigiriya_South, BlueNode.Sigiriya_South_South],
  [Place.Madagascar, RedNode.Madagascar_South],
  [Place.Omatako, Place.AtlanticOcean],
  [Place.Omatako, BlueNode.Elmiha_South_South],
  [BlueNode.Elmiha_South_South, Place.AtlanticOcean],
  [BlueNode.Elmiha_South_South, RedNode.Elmiha_South_South_South],
  [BlueNode.Elmiha_South_South, Place.SalvadorDeBahia],
  [Place.SalvadorDeBahia, Place.IguazuFalls],
  [Place.SalvadorDeBahia, Place.Marajo],
  [Place.Tikal, Place.SaltoAngel],
  [Place.Tikal, Place.GalapagosIslands],
  [Place.Tikal, Place.Teotihuacan],
  [Place.Teotihuacan, RedNode.Teotihuacan_SouthWest],
  [Place.Teotihuacan, Place.GrandCanyon],
  [Place.GrandCanyon, RedNode.CraterLake_NorthWest],
  [RedNode.CraterLake_NorthWest, Place.Denali],
  [BlueNode.MountFuji_South, RedNode.Teotihuacan_SouthWest],
  [BlueNode.MountFuji_South, RedNode.AngkorVat_East],
  [RedNode.AngkorVat_East, RedNode.Teotihuacan_SouthWest],
  [RedNode.AngkorVat_East, Place.Sulawesi],
  [Place.Sulawesi, Place.Papua],
  [Place.Borobudur, Place.ArnhemLand],
  [Place.Borobudur, Place.BungleBungleRange],
  [BlueNode.Sigiriya_South_South, Place.BungleBungleRange],
  [BlueNode.Sigiriya_South_South, RedNode.Sigiriya_South_South_South],
  [RedNode.Madagascar_South, BlueNode.Madagascar_South_South],
  [RedNode.Madagascar_South, Place.IndienOcean],
  [Place.AtlanticOcean, Place.IndienOcean],
  [RedNode.Elmiha_South_South_South, BlueNode.Elmiha_South_South_South_South],
  [RedNode.Elmiha_South_South_South, BlueNode.IguazuFalls_South],
  [Place.IguazuFalls, BlueNode.IguazuFalls_South],
  [Place.IguazuFalls, Place.Atacama],
  [Place.IguazuFalls, Place.Aripuana],
  [Place.Marajo, Place.Aripuana],
  [Place.Marajo, Place.SaltoAngel],
  [Place.SaltoAngel, Place.AmazonRainforest],
  [Place.SaltoAngel, RedNode.SaltoAngel_West],
  [Place.GalapagosIslands, Place.PacificOcean],
  [Place.GalapagosIslands, RedNode.Teotihuacan_SouthWest],
  [Place.Papua, BlueNode.PapuaNewGuinea_North],
  [Place.Papua, Place.ArnhemLand],
  [Place.ArnhemLand, Place.GreatBarrierReef],
  [Place.BungleBungleRange, Place.Uluru],
  [RedNode.Sigiriya_South_South_South, Place.Perth],
  [RedNode.Sigiriya_South_South_South, BlueNode.Madagascar_South_South],
  [BlueNode.Madagascar_South_South, RedNode.Madagascar_South_South_SouthEast],
  [BlueNode.Madagascar_South_South, RedNode.Madagascar_South_South_South],
  [Place.IndienOcean, RedNode.IndienOcean_SouthWest],
  [BlueNode.Elmiha_South_South_South_South, RedNode.IndienOcean_SouthWest],
  [BlueNode.Elmiha_South_South_South_South, Place.GrahamLand],
  [BlueNode.IguazuFalls_South, Place.TierraDelFuego],
  [Place.Atacama, Place.TierraDelFuego],
  [Place.Atacama, RedNode.Atacama_West],
  [Place.Atacama, Place.Altiplano],
  [Place.AmazonRainforest, Place.Altiplano],
  [Place.AmazonRainforest, Place.MachuPicchu],
  [RedNode.SaltoAngel_West, Place.MachuPicchu],
  [Place.PacificOcean, Place.MachuPicchu],
  [Place.PacificOcean, Place.RapaNui],
  [BlueNode.PapuaNewGuinea_North, RedNode.Teotihuacan_SouthWest],
  [Place.GreatBarrierReef, RedNode.RapaNui_South],
  [Place.Uluru, Place.Tasmania],
  [Place.Uluru, Place.Perth],
  [Place.Perth, BlueNode.Perth_South],
  [RedNode.Madagascar_South_South_SouthEast, BlueNode.Perth_South],
  [RedNode.Madagascar_South_South_SouthEast, RedNode.Madagascar_South_South_South],
  [RedNode.Madagascar_South_South_South, BlueNode.IndienOcean_SouthWest_SouthEast],
  [RedNode.IndienOcean_SouthWest, BlueNode.IndienOcean_SouthWest_SouthEast],
  [RedNode.IndienOcean_SouthWest, BlueNode.GrahamLand_East],
  [Place.GrahamLand, BlueNode.GrahamLand_East],
  [Place.GrahamLand, Place.TierraDelFuego],
  [Place.TierraDelFuego, RedNode.TierraDelFuego_West],
  [RedNode.Atacama_West, Place.RapaNui],
  [RedNode.Atacama_West, Place.MachuPicchu],
  [Place.Altiplano, Place.MachuPicchu],
  [Place.RapaNui, RedNode.RapaNui_South],
  [RedNode.RapaNui_South, BlueNode.RapaNui_South_SouthEast],
  [Place.Tasmania, Place.FiordlandNationalPark],
  [Place.Tasmania, BlueNode.Perth_South],
  [BlueNode.IndienOcean_SouthWest_SouthEast, BlueNode.GrahamLand_East],
  [RedNode.TierraDelFuego_West, BlueNode.RapaNui_South_SouthEast],
  [Place.FiordlandNationalPark, RedNode.RapaNui_South]
]

export const redNodes = Object.values(RedNode).filter<RedNode>(isEnumValue)
export const blueNodes = Object.values(BlueNode).filter<BlueNode>(isEnumValue)
export const nodes = [StartNode, ...places, ...blueNodes, ...redNodes]

export const isRoadToNode = (node: Node, location: Partial<Location>): boolean => {
  if (!Array.isArray(location.id)) return false
  if (location.rotation) return location.id[0] === node
  else return location.id[1] === node
}

export const arrowRoad = (location: Partial<Location>): Road => location.rotation ? [location.id[1], location.id[0]] : location.id

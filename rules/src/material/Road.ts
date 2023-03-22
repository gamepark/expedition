import {Place} from './Place'

export enum BlueNode {
  MackenzieDelta_East = 100,
  Thingvellir_West,
  Newfoundland_South,
  Rome_West,
  Elmina_West,
  Omatako_West,
  IguazuFalls_South,
  TierraDelFuego_West_West,
  GrahamLand_North,
  GrahamLand_East,
  GrahamLand_East_East,
  Madagascar_South_South,
  Madagascar_East,
  Madagascar_North,
  CaspianSea_West,
  MountEverest_North,
  BungleBungleRange_West,
  Tasmania_West,
  PapuaNewGuinea_North,
  MountFuji_South,
}

export enum RedNode {
  Denali_West = 200,
  Banff_East,
  PuertoRico_East,
  GalapagosIslands_West,
  Atacama_West,
  RapaNui_South,
  MachuPicchu_North,
  TierraDelFuego_West,
  Elmiha_South,
  Douala_South,
  IguazuFalls_South_West,
  IndienOcean_West,
  IndienOcean_South_East,
  Tasmania_West_West,
  Madagascar_South,
  Perth_West,
  Borobudur_West,
  Sanaa_South,
  Svalbard_East,
  Sakha_West,
  Sulawesi_East,
}

const StartNode = 0

type Node = typeof StartNode | Place | BlueNode | RedNode

export const isGreenNode = (node: Node): node is Place => node < 100

export const isBlueNode = (node: Node): node is BlueNode => node >= 100 && node < 200

export const isRedNode = (node: Node): node is RedNode => node >= 200

export type Road = [Node, Node]

export const roads: Road[] = [
  [Place.Denali, RedNode.Denali_West],
  [Place.Denali, Place.MackenzieDelta],
  [Place.Denali, Place.CraterLake],
  [Place.MackenzieDelta, BlueNode.MackenzieDelta_East],
  [Place.CraterLake, RedNode.Denali_West],
  [Place.CraterLake, Place.Banff],
  [Place.CraterLake, Place.GrandCanyon],
  [Place.GrandCanyon, RedNode.Denali_West],
  [Place.GrandCanyon, Place.OldFaithful],
  [Place.GrandCanyon, Place.Teotihuacan],
  [Place.Banff, RedNode.Banff_East],
  [Place.Banff, Place.NiagaraFalls],
  [Place.OldFaithful, Place.NiagaraFalls],
  [Place.NiagaraFalls, Place.Louisiane],
  [Place.NiagaraFalls, BlueNode.Newfoundland_South],
  [Place.Louisiane, Place.Teotihuacan],
  [Place.Louisiane, Place.PuertoRico],
  [Place.Teotihuacan, Place.Tikal],
  [Place.Teotihuacan, RedNode.GalapagosIslands_West],
  [Place.Tikal, Place.PuertoRico],
  [Place.PuertoRico, RedNode.PuertoRico_East],
  [Place.Tikal, Place.GalapagosIslands],
  [Place.Tikal, Place.SaltoAngel],
  [Place.GalapagosIslands, RedNode.GalapagosIslands_West],
  [Place.GalapagosIslands, Place.PacificOcean],
  [Place.PacificOcean, Place.MachuPicchu],
  [Place.PacificOcean, Place.RapaNui],
  [Place.RapaNui, RedNode.Atacama_West],
  [Place.RapaNui, RedNode.RapaNui_South],
  [Place.SaltoAngel, RedNode.MachuPicchu_North],
  [Place.SaltoAngel, Place.AmazonRainforest],
  [Place.SaltoAngel, Place.Marajo],
  [Place.AmazonRainforest, Place.MachuPicchu],
  [Place.AmazonRainforest, Place.Altiplano],
  [Place.MachuPicchu, Place.Altiplano],
  [Place.MachuPicchu, RedNode.Atacama_West],
  [Place.Altiplano, Place.Atacama],
  [Place.Atacama, RedNode.Atacama_West],
  [Place.Atacama, Place.TierraDelFuego],
  [Place.Atacama, Place.IguazuFalls],
  [Place.TierraDelFuego, BlueNode.IguazuFalls_South],
  [Place.TierraDelFuego, RedNode.TierraDelFuego_West],
  [Place.Marajo, Place.Aripuana],
  [Place.Marajo, Place.SalvadorDeBahia],
  [Place.Aripuana, Place.IguazuFalls],
  [Place.SalvadorDeBahia, Place.IguazuFalls],
  [Place.IguazuFalls, BlueNode.IguazuFalls_South],
  [Place.SalvadorDeBahia, RedNode.Elmiha_South],
  [Place.SalvadorDeBahia, BlueNode.Omatako_West],
  [Place.TierraDelFuego, Place.GrahamLand],
  [Place.GrahamLand, BlueNode.GrahamLand_North],
  [Place.GrahamLand, BlueNode.GrahamLand_East],
  [BlueNode.MackenzieDelta_East, RedNode.Banff_East],
  [Place.NorthwestPassage, BlueNode.MackenzieDelta_East],
  [Place.NorthwestPassage, RedNode.Banff_East],
  [Place.NorthwestPassage, Place.Greenland],
  [Place.NorthwestPassage, BlueNode.Thingvellir_West],
  [Place.Greenland, Place.Thingvellir],
  [Place.Thingvellir, StartNode],
  [Place.Thingvellir, Place.Stonehenge],
  [Place.Stonehenge, StartNode],
  [Place.Stonehenge, Place.Newfoundland],
  [Place.Newfoundland, BlueNode.Thingvellir_West],
  [Place.Newfoundland, RedNode.Banff_East],
  [Place.Newfoundland, BlueNode.Newfoundland_South],
  [Place.Newfoundland, BlueNode.Rome_West],
  [BlueNode.Newfoundland_South, RedNode.PuertoRico_East],
  [RedNode.PuertoRico_East, BlueNode.Elmina_West],
  [BlueNode.Elmina_West, RedNode.Elmiha_South],
  [RedNode.Elmiha_South, RedNode.Douala_South],
  [RedNode.Elmiha_South, BlueNode.Omatako_West],
  [BlueNode.Omatako_West, RedNode.IguazuFalls_South_West],
  [BlueNode.IguazuFalls_South, RedNode.IguazuFalls_South_West],
  [RedNode.IguazuFalls_South_West, BlueNode.GrahamLand_North],
  [BlueNode.GrahamLand_North, RedNode.IndienOcean_West],
  [RedNode.IndienOcean_West, BlueNode.GrahamLand_East],
  [RedNode.IndienOcean_West, BlueNode.GrahamLand_East_East],
  [BlueNode.GrahamLand_East, BlueNode.GrahamLand_East_East],
  [BlueNode.GrahamLand_East_East, RedNode.IndienOcean_South_East],
  [RedNode.IndienOcean_South_East, BlueNode.Madagascar_South_South],
  [RedNode.IndienOcean_South_East, RedNode.Tasmania_West_West],
  [BlueNode.Madagascar_South_South, RedNode.Tasmania_West_West],
  [BlueNode.Madagascar_South_South, RedNode.Madagascar_South],
  [BlueNode.Madagascar_South_South, RedNode.Perth_West],
  [BlueNode.Madagascar_South_South, BlueNode.Tasmania_West],
  [RedNode.Perth_West, BlueNode.BungleBungleRange_West],
  [BlueNode.BungleBungleRange_West, RedNode.Borobudur_West],
  [RedNode.Borobudur_West, BlueNode.Madagascar_East],
  [BlueNode.Madagascar_East, RedNode.Sanaa_South],
  [RedNode.Sanaa_South, BlueNode.Madagascar_North],
  [Place.CanaryIslands, BlueNode.Rome_West],
  [Place.CanaryIslands, RedNode.PuertoRico_East],
  [Place.Svalbard, StartNode],
  [Place.Svalbard, RedNode.Svalbard_East],
  [StartNode, BlueNode.CaspianSea_West],
  [Place.Rome, StartNode],
  [Place.Rome, BlueNode.Rome_West],
  [Place.Athens, StartNode],
  [Place.Athens, Place.Timgad],
  [Place.Athens, Place.Gizeh],
  [Place.Athens, Place.Petra],
  [Place.Timgad, BlueNode.Rome_West],
  [Place.Timgad, Place.Tombouctou],
  [Place.Timgad, Place.Sahara],
  [Place.Timgad, Place.Gizeh],
  [Place.Tombouctou, RedNode.PuertoRico_East],
  [Place.Tombouctou, Place.Elmina],
  [Place.Elmina, BlueNode.Elmina_West],
  [Place.Elmina, RedNode.Elmiha_South],
  [Place.Elmina, Place.Douala],
  [Place.Sahara, Place.Gizeh],
  [Place.Sahara, Place.Koush],
  [Place.Sahara, Place.Douala],
  [Place.Douala, RedNode.Douala_South],
  [Place.Douala, Place.Virunga],
  [Place.Koush, Place.Virunga],
  [Place.Gizeh, Place.Aksoum],
  [Place.Aksoum, Place.Virunga],
  [Place.Aksoum, RedNode.Sanaa_South],
  [Place.Virunga, Place.VictoriaFalls],
  [Place.VictoriaFalls, BlueNode.Madagascar_North],
  [Place.VictoriaFalls, Place.Madagascar],
  [Place.Madagascar, BlueNode.Madagascar_North],
  [Place.Madagascar, BlueNode.Madagascar_East],
  [Place.Madagascar, RedNode.Madagascar_South],
  [Place.Omatako, RedNode.Douala_South],
  [Place.Omatako, BlueNode.Omatako_West],
  [Place.Omatako, Place.AtlanticOcean],
  [Place.AtlanticOcean, BlueNode.Omatako_West],
  [Place.AtlanticOcean, Place.IndienOcean],
  [Place.IndienOcean, RedNode.IndienOcean_West],
  [Place.IndienOcean, RedNode.Madagascar_South],
  [Place.Petra, Place.Babylone],
  [Place.Petra, Place.Persepolis],
  [Place.Petra, Place.Sanaa],
  [Place.Sanaa, Place.Persepolis],
  [Place.Sanaa, RedNode.Sanaa_South],
  [Place.Persepolis, Place.TajMahal],
  [Place.Babylone, Place.CaspianSea],
  [Place.Babylone, Place.Harappa],
  [Place.Harappa, Place.MountEverest],
  [Place.Harappa, Place.TajMahal],
  [Place.MountEverest, BlueNode.MountEverest_North],
  [Place.MountEverest, Place.Xian],
  [Place.Xian, Place.Bagan],
  [Place.Xian, BlueNode.MountFuji_South],
  [Place.TajMahal, Place.Bagan],
  [Place.TajMahal, Place.Sigiriya],
  [Place.Bagan, Place.Sigiriya],
  [Place.Sigiriya, RedNode.Sanaa_South],
  [Place.Sigiriya, RedNode.Borobudur_West],
  [Place.Sigiriya, Place.AngkorVat],
  [Place.CaspianSea, BlueNode.CaspianSea_West],
  [Place.CaspianSea, Place.Novossibirsk],
  [Place.Novossibirsk, Place.PutoranaPlateau],
  [Place.Novossibirsk, BlueNode.MountEverest_North],
  [Place.PutoranaPlateau, RedNode.Svalbard_East],
  [Place.PutoranaPlateau, Place.Zagorsk],
  [Place.PutoranaPlateau, Place.Sakha],
  [Place.PutoranaPlateau, RedNode.Sakha_West],
  [Place.Sakha, RedNode.Sakha_West],
  [Place.Sakha, Place.Kolyma],
  [Place.Sakha, Place.LakeBaikal],
  [RedNode.Sakha_West, BlueNode.MountEverest_North],
  [Place.Kolyma, Place.BeringStraitCrossing],
  [Place.Kolyma, Place.LakeBaikal],
  [Place.BeringStraitCrossing, RedNode.Denali_West],
  [Place.LakeBaikal, Place.AmurRiver],
  [Place.LakeBaikal, BlueNode.MountEverest_North],
  [Place.AmurRiver, RedNode.Denali_West],
  [Place.AmurRiver, Place.GreatWallOfChina],
  [Place.GreatWallOfChina, BlueNode.MountEverest_North],
  [Place.GreatWallOfChina, Place.MountFuji],
  [Place.MountFuji, RedNode.Denali_West],
  [Place.MountFuji, BlueNode.MountFuji_South],
  [Place.AngkorVat, RedNode.Sulawesi_East],
  [Place.AngkorVat, Place.Sulawesi],
  [Place.Sulawesi, RedNode.Sulawesi_East],
  [Place.Sulawesi, Place.PapuaNewGuinea],
  [Place.PapuaNewGuinea, BlueNode.PapuaNewGuinea_North],
  [Place.PapuaNewGuinea, Place.ArnhemLand],
  [BlueNode.MountFuji_South, RedNode.Sulawesi_East],
  [BlueNode.MountFuji_South, RedNode.GalapagosIslands_West],
  [RedNode.Sulawesi_East, RedNode.GalapagosIslands_West],
  [RedNode.GalapagosIslands_West, BlueNode.PapuaNewGuinea_North],
  [Place.ArnhemLand, Place.Borobudur],
  [Place.ArnhemLand, Place.GreatBarrierReef],
  [Place.GreatBarrierReef, RedNode.RapaNui_South],
  [Place.Borobudur, RedNode.Borobudur_West],
  [Place.Borobudur, Place.BungleBungleRange],
  [Place.BungleBungleRange, BlueNode.BungleBungleRange_West],
  [Place.BungleBungleRange, Place.Uluru],
  [Place.Uluru, Place.Perth],
  [Place.Uluru, Place.Tasmania],
  [Place.Perth, RedNode.Perth_West],
  [Place.Perth, BlueNode.Tasmania_West],
  [Place.Tasmania, BlueNode.Tasmania_West],
  [Place.Tasmania, Place.FiordlandNationalPark],
  [Place.FiordlandNationalPark, RedNode.RapaNui_South],
  [RedNode.RapaNui_South, BlueNode.TierraDelFuego_West_West],
  [RedNode.TierraDelFuego_West, BlueNode.TierraDelFuego_West_West],
]
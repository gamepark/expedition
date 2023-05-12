/** @jsxImportSource @emotion/react */
import back from '../images/cards/back.jpg'
import Delani from '../images/cards/01-Denali.jpg'
import MackenzieDelta from '../images/cards/02-MackenzieDelta.jpg'
import NorthwestPassage from '../images/cards/03-NorthwestPassage.jpg'
import Banff from '../images/cards/04-Banff.jpg'
import CraterLake from '../images/cards/05-CraterLake.jpg'
import OldFaithful from '../images/cards/06-OldFaithful.jpg'
import PuertoRico from '../images/cards/07-PuertoRico.jpg'
import GrandCanyon from '../images/cards/08-GrandCanyon.jpg'
import NiagaraFalls from '../images/cards/09-NiagaraFalls.jpg'
import Louisiane from '../images/cards/10-Louisiane.jpg'
import Teotihuacan from '../images/cards/11-Teotihuacan.jpg'
import Tikal from '../images/cards/12-Tikal.jpg'
import Newfoundland from '../images/cards/13-Newfoundland.jpg'
import Greenland from '../images/cards/14-Greenland.jpg'
import SaltoAngel from '../images/cards/15-SaltoAngel.jpg'
import Marajo from '../images/cards/16-Marajo.jpg'
import AmazonRainforest from '../images/cards/17-AmazonRainforest.jpg'
import MachuPicchu from '../images/cards/18-MachuPicchu.jpg'
import Aripuana from '../images/cards/19-Aripuana.jpg'
import SalvadorDeBahia from '../images/cards/20-SalvadorDeBahia.jpg'
import Altiplano from '../images/cards/21-Altiplano.jpg'
import IguazuFalls from '../images/cards/22-IguazuFalls.jpg'
import Atacama from '../images/cards/23-Atacama.jpg'
import GalapagosIslands from '../images/cards/24-GalapagosIslands.jpg'
import PacificOcean from '../images/cards/25-PacificOcean.jpg'
import RapaNui from '../images/cards/26-RapaNui.jpg'
import TierraDelFuego from '../images/cards/27-TierraDelFuego.jpg'
import GrahamLand from '../images/cards/28-GrahamLand.jpg'
import Svalbard from '../images/cards/29-Svalbard.jpg'
import Thingvellir from '../images/cards/30-Thingvellir.jpg'
import Stonehenge from '../images/cards/31-Stonehenge.jpg'
import Rome from '../images/cards/32-Rome.jpg'
import Athens from '../images/cards/33-Athens.jpg'
import Timgad from '../images/cards/34-Timgad.jpg'
import CanaryIslands from '../images/cards/35-CanaryIslands.jpg'
import Sahara from '../images/cards/36-Sahara.jpg'
import Gizeh from '../images/cards/37-Gizeh.jpg'
import Tombouctou from '../images/cards/38-Tombouctou.jpg'
import Koush from '../images/cards/39-Koush.jpg'
import Aksoum from '../images/cards/40-Aksoum.jpg'
import Elmina from '../images/cards/41-Elmina.jpg'
import Douala from '../images/cards/42-Douala.jpg'
import Virunga from '../images/cards/43-Virunga.jpg'
import VictoriaFalls from '../images/cards/44-VictoriaFalls.jpg'
import Omatako from '../images/cards/45-Omatako.jpg'
import AtlanticOcean from '../images/cards/46-AtlanticOcean.jpg'
import Madagascar from '../images/cards/47-Madagascar.jpg'
import IndienOcean from '../images/cards/48-IndienOcean.jpg'
import Petra from '../images/cards/49-Petra.jpg'
import Babylone from '../images/cards/50-Babylone.jpg'
import Persepolis from '../images/cards/51-Persepolis.jpg'
import Sanaa from '../images/cards/52-Sanaa.jpg'
import CaspianSea from '../images/cards/53-CaspianSea.jpg'
import Zagorsk from '../images/cards/54-Zagorsk.jpg'
import PutoranaPlateau from '../images/cards/55-PutoranaPlateau.jpg'
import Novossibirsk from '../images/cards/56-Novossibirsk.jpg'
import Harappa from '../images/cards/57-Harappa.jpg'
import Sakha from '../images/cards/58-Sakha.jpg'
import LakeBaikal from '../images/cards/59-LakeBaikal.jpg'
import GreatWallOfChina from '../images/cards/60-GreatWallOfChina.jpg'
import MountEverest from '../images/cards/61-MountEverest.jpg'
import TajMahal from '../images/cards/62-TajMahal.jpg'
import Sigiriya from '../images/cards/63-Sigiriya.jpg'
import Bagan from '../images/cards/64-Bagan.jpg'
import AngkorVat from '../images/cards/65-AngkorVat.jpg'
import Xian from '../images/cards/66-Xian.jpg'
import AmurRiver from '../images/cards/67-AmurRiver.jpg'
import Kolyma from '../images/cards/68-Kolyma.jpg'
import BeringStraitCrossing from '../images/cards/69-BeringStraitCrossing.jpg'
import MountFuji from '../images/cards/70-MountFuji.jpg'
import Borobudur from '../images/cards/71-Borobudur.jpg'
import Sulawesi from '../images/cards/72-Sulawesi.jpg'
import PapuaNewGuinea from '../images/cards/73-PapuaNewGuinea.jpg'
import ArnhemLand from '../images/cards/74-ArnhemLand.jpg'
import BungleBungleRange from '../images/cards/75-BungleBungleRange.jpg'
import GreatBarrierReef from '../images/cards/76-GreatBarrierReef.jpg'
import Uluru from '../images/cards/77-Uluru.jpg'
import Perth from '../images/cards/78-Perth.jpg'
import Tasmania from '../images/cards/79-Tasmania.jpg'
import FiordlandNationalPark from '../images/cards/80-FiordlandNationalPark.jpg'
import { CardMaterialDescription, MaterialComponentType } from '@gamepark/react-game'
import { Place } from '@gamepark/expedition/material/Place'
import { CardRules } from './CardRules'

export const CardsDescription: CardMaterialDescription = {
  type: MaterialComponentType.Card,
  props: {
    height: 8.8,
    ratio: 5 / 7,
    back: {
      image: back
    },
    front: {
      image: {
        [Place.Denali]: Delani,
        [Place.MackenzieDelta]: MackenzieDelta,
        [Place.NorthwestPassage]: NorthwestPassage,
        [Place.Banff]: Banff,
        [Place.CraterLake]: CraterLake,
        [Place.OldFaithful]: OldFaithful,
        [Place.PuertoRico]: PuertoRico,
        [Place.GrandCanyon]: GrandCanyon,
        [Place.NiagaraFalls]: NiagaraFalls,
        [Place.Louisiane]: Louisiane,
        [Place.Teotihuacan]: Teotihuacan,
        [Place.Tikal]: Tikal,
        [Place.Newfoundland]: Newfoundland,
        [Place.Greenland]: Greenland,
        [Place.SaltoAngel]: SaltoAngel,
        [Place.Marajo]: Marajo,
        [Place.AmazonRainforest]: AmazonRainforest,
        [Place.MachuPicchu]: MachuPicchu,
        [Place.Aripuana]: Aripuana,
        [Place.SalvadorDeBahia]: SalvadorDeBahia,
        [Place.Altiplano]: Altiplano,
        [Place.IguazuFalls]: IguazuFalls,
        [Place.Atacama]: Atacama,
        [Place.GalapagosIslands]: GalapagosIslands,
        [Place.PacificOcean]: PacificOcean,
        [Place.RapaNui]: RapaNui,
        [Place.TierraDelFuego]: TierraDelFuego,
        [Place.GrahamLand]: GrahamLand,
        [Place.Svalbard]: Svalbard,
        [Place.Thingvellir]: Thingvellir,
        [Place.Stonehenge]: Stonehenge,
        [Place.Rome]: Rome,
        [Place.Athens]: Athens,
        [Place.Timgad]: Timgad,
        [Place.CanaryIslands]: CanaryIslands,
        [Place.Sahara]: Sahara,
        [Place.Gizeh]: Gizeh,
        [Place.Tombouctou]: Tombouctou,
        [Place.Koush]: Koush,
        [Place.Aksoum]: Aksoum,
        [Place.Elmina]: Elmina,
        [Place.Douala]: Douala,
        [Place.Virunga]: Virunga,
        [Place.VictoriaFalls]: VictoriaFalls,
        [Place.Omatako]: Omatako,
        [Place.AtlanticOcean]: AtlanticOcean,
        [Place.Madagascar]: Madagascar,
        [Place.IndienOcean]: IndienOcean,
        [Place.Petra]: Petra,
        [Place.Babylone]: Babylone,
        [Place.Persepolis]: Persepolis,
        [Place.Sanaa]: Sanaa,
        [Place.CaspianSea]: CaspianSea,
        [Place.Zagorsk]: Zagorsk,
        [Place.PutoranaPlateau]: PutoranaPlateau,
        [Place.Novossibirsk]: Novossibirsk,
        [Place.Harappa]: Harappa,
        [Place.Sakha]: Sakha,
        [Place.LakeBaikal]: LakeBaikal,
        [Place.GreatWallOfChina]: GreatWallOfChina,
        [Place.MountEverest]: MountEverest,
        [Place.TajMahal]: TajMahal,
        [Place.Sigiriya]: Sigiriya,
        [Place.Bagan]: Bagan,
        [Place.AngkorVat]: AngkorVat,
        [Place.Xian]: Xian,
        [Place.AmurRiver]: AmurRiver,
        [Place.Kolyma]: Kolyma,
        [Place.BeringStraitCrossing]: BeringStraitCrossing,
        [Place.MountFuji]: MountFuji,
        [Place.Borobudur]: Borobudur,
        [Place.Sulawesi]: Sulawesi,
        [Place.PapuaNewGuinea]: PapuaNewGuinea,
        [Place.ArnhemLand]: ArnhemLand,
        [Place.BungleBungleRange]: BungleBungleRange,
        [Place.GreatBarrierReef]: GreatBarrierReef,
        [Place.Uluru]: Uluru,
        [Place.Perth]: Perth,
        [Place.Tasmania]: Tasmania,
        [Place.FiordlandNationalPark]: FiordlandNationalPark
      }
    }
  },
  rules: CardRules
}

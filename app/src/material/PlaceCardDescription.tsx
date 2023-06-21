/** @jsxImportSource @emotion/react */
import back from '../images/cards/back.jpg'
import Delani from '../images/cards/fr/01-Denali.jpg'
import MackenzieDelta from '../images/cards/fr/02-MackenzieDelta.jpg'
import NorthwestPassage from '../images/cards/fr/03-NorthwestPassage.jpg'
import Banff from '../images/cards/fr/04-Banff.jpg'
import CraterLake from '../images/cards/fr/05-CraterLake.jpg'
import OldFaithful from '../images/cards/fr/06-OldFaithful.jpg'
import PuertoRico from '../images/cards/fr/07-PuertoRico.jpg'
import GrandCanyon from '../images/cards/fr/08-GrandCanyon.jpg'
import NiagaraFalls from '../images/cards/fr/09-NiagaraFalls.jpg'
import Louisiane from '../images/cards/fr/10-Louisiane.jpg'
import Teotihuacan from '../images/cards/fr/11-Teotihuacan.jpg'
import Tikal from '../images/cards/fr/12-Tikal.jpg'
import Newfoundland from '../images/cards/fr/13-Newfoundland.jpg'
import Greenland from '../images/cards/fr/14-Greenland.jpg'
import SaltoAngel from '../images/cards/fr/15-SaltoAngel.jpg'
import Marajo from '../images/cards/fr/16-Marajo.jpg'
import AmazonRainforest from '../images/cards/fr/17-AmazonRainforest.jpg'
import MachuPicchu from '../images/cards/fr/18-MachuPicchu.jpg'
import Aripuana from '../images/cards/fr/19-Aripuana.jpg'
import SalvadorDeBahia from '../images/cards/fr/20-SalvadorDeBahia.jpg'
import Altiplano from '../images/cards/fr/21-Altiplano.jpg'
import IguazuFalls from '../images/cards/fr/22-IguazuFalls.jpg'
import Atacama from '../images/cards/fr/23-Atacama.jpg'
import GalapagosIslands from '../images/cards/fr/24-GalapagosIslands.jpg'
import PacificOcean from '../images/cards/fr/25-PacificOcean.jpg'
import RapaNui from '../images/cards/fr/26-RapaNui.jpg'
import TierraDelFuego from '../images/cards/fr/27-TierraDelFuego.jpg'
import GrahamLand from '../images/cards/fr/28-GrahamLand.jpg'
import Svalbard from '../images/cards/fr/29-Svalbard.jpg'
import Thingvellir from '../images/cards/fr/30-Thingvellir.jpg'
import Stonehenge from '../images/cards/fr/31-Stonehenge.jpg'
import Rome from '../images/cards/fr/32-Rome.jpg'
import Athens from '../images/cards/fr/33-Athens.jpg'
import Timgad from '../images/cards/fr/34-Timgad.jpg'
import CanaryIslands from '../images/cards/fr/35-CanaryIslands.jpg'
import Sahara from '../images/cards/fr/36-Sahara.jpg'
import Gizeh from '../images/cards/fr/37-Gizeh.jpg'
import Tombouctou from '../images/cards/fr/38-Tombouctou.jpg'
import Koush from '../images/cards/fr/39-Koush.jpg'
import Aksoum from '../images/cards/fr/40-Aksoum.jpg'
import Elmina from '../images/cards/fr/41-Elmina.jpg'
import Douala from '../images/cards/fr/42-Douala.jpg'
import Virunga from '../images/cards/fr/43-Virunga.jpg'
import VictoriaFalls from '../images/cards/fr/44-VictoriaFalls.jpg'
import Omatako from '../images/cards/fr/45-Omatako.jpg'
import AtlanticOcean from '../images/cards/fr/46-AtlanticOcean.jpg'
import Madagascar from '../images/cards/fr/47-Madagascar.jpg'
import IndienOcean from '../images/cards/fr/48-IndienOcean.jpg'
import Petra from '../images/cards/fr/49-Petra.jpg'
import Babylone from '../images/cards/fr/50-Babylone.jpg'
import Persepolis from '../images/cards/fr/51-Persepolis.jpg'
import Sanaa from '../images/cards/fr/52-Sanaa.jpg'
import CaspianSea from '../images/cards/fr/53-CaspianSea.jpg'
import Zagorsk from '../images/cards/fr/54-Zagorsk.jpg'
import PutoranaPlateau from '../images/cards/fr/55-PutoranaPlateau.jpg'
import Novossibirsk from '../images/cards/fr/56-Novossibirsk.jpg'
import Harappa from '../images/cards/fr/57-Harappa.jpg'
import Sakha from '../images/cards/fr/58-Sakha.jpg'
import LakeBaikal from '../images/cards/fr/59-LakeBaikal.jpg'
import GreatWallOfChina from '../images/cards/fr/60-GreatWallOfChina.jpg'
import MountEverest from '../images/cards/fr/61-MountEverest.jpg'
import TajMahal from '../images/cards/fr/62-TajMahal.jpg'
import Sigiriya from '../images/cards/fr/63-Sigiriya.jpg'
import Bagan from '../images/cards/fr/64-Bagan.jpg'
import AngkorVat from '../images/cards/fr/65-AngkorVat.jpg'
import Xian from '../images/cards/fr/66-Xian.jpg'
import AmurRiver from '../images/cards/fr/67-AmurRiver.jpg'
import Kolyma from '../images/cards/fr/68-Kolyma.jpg'
import BeringStraitCrossing from '../images/cards/fr/69-BeringStraitCrossing.jpg'
import MountFuji from '../images/cards/fr/70-MountFuji.jpg'
import Borobudur from '../images/cards/fr/71-Borobudur.jpg'
import Sulawesi from '../images/cards/fr/72-Sulawesi.jpg'
import PapuaNewGuinea from '../images/cards/fr/73-PapuaNewGuinea.jpg'
import ArnhemLand from '../images/cards/fr/74-ArnhemLand.jpg'
import BungleBungleRange from '../images/cards/fr/75-BungleBungleRange.jpg'
import GreatBarrierReef from '../images/cards/fr/76-GreatBarrierReef.jpg'
import Uluru from '../images/cards/fr/77-Uluru.jpg'
import Perth from '../images/cards/fr/78-Perth.jpg'
import Tasmania from '../images/cards/fr/79-Tasmania.jpg'
import FiordlandNationalPark from '../images/cards/fr/80-FiordlandNationalPark.jpg'

import { CardDescription } from '@gamepark/react-game'
import { Place } from '@gamepark/expedition/material/Place'
import { CardRules } from './CardRules'
import { LocationType } from '@gamepark/expedition/material/LocationType'

export class PlaceCardDescription extends CardDescription {
  backImage = back

  images = {
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

  rules = CardRules

  stock = {
    location: {
      type: LocationType.Deck
    }
  }
}

export const cardDescription = new PlaceCardDescription()

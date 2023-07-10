/** @jsxImportSource @emotion/react */
import back from '../images/cards/en/back.jpg'
import Delani from '../images/cards/en/01-Denali.jpg'
import MackenzieDelta from '../images/cards/en/02-MackenzieDelta.jpg'
import NorthwestPassage from '../images/cards/en/03-NorthwestPassage.jpg'
import Banff from '../images/cards/en/04-Banff.jpg'
import CraterLake from '../images/cards/en/05-CraterLake.jpg'
import OldFaithful from '../images/cards/en/06-OldFaithful.jpg'
import PuertoRico from '../images/cards/en/07-PuertoRico.jpg'
import GrandCanyon from '../images/cards/en/08-GrandCanyon.jpg'
import NiagaraFalls from '../images/cards/en/09-NiagaraFalls.jpg'
import Louisiane from '../images/cards/en/10-Louisiane.jpg'
import Teotihuacan from '../images/cards/en/11-Teotihuacan.jpg'
import Tikal from '../images/cards/en/12-Tikal.jpg'
import Newfoundland from '../images/cards/en/13-Newfoundland.jpg'
import Greenland from '../images/cards/en/14-Greenland.jpg'
import SaltoAngel from '../images/cards/en/15-SaltoAngel.jpg'
import Marajo from '../images/cards/en/16-Marajo.jpg'
import AmazonRainforest from '../images/cards/en/17-AmazonRainforest.jpg'
import MachuPicchu from '../images/cards/en/18-MachuPicchu.jpg'
import Aripuana from '../images/cards/en/19-Aripuana.jpg'
import SalvadorDeBahia from '../images/cards/en/20-SalvadorDeBahia.jpg'
import Altiplano from '../images/cards/en/21-Altiplano.jpg'
import IguazuFalls from '../images/cards/en/22-IguazuFalls.jpg'
import Atacama from '../images/cards/en/23-Atacama.jpg'
import GalapagosIslands from '../images/cards/en/24-GalapagosIslands.jpg'
import PacificOcean from '../images/cards/en/25-PacificOcean.jpg'
import RapaNui from '../images/cards/en/26-RapaNui.jpg'
import TierraDelFuego from '../images/cards/en/27-TierraDelFuego.jpg'
import GrahamLand from '../images/cards/en/28-GrahamLand.jpg'
import Svalbard from '../images/cards/en/29-Svalbard.jpg'
import Thingvellir from '../images/cards/en/30-Thingvellir.jpg'
import Stonehenge from '../images/cards/en/31-Stonehenge.jpg'
import Rome from '../images/cards/en/32-Rome.jpg'
import Athens from '../images/cards/en/33-Athens.jpg'
import Timgad from '../images/cards/en/34-Timgad.jpg'
import CanaryIslands from '../images/cards/en/35-CanaryIslands.jpg'
import Sahara from '../images/cards/en/36-Sahara.jpg'
import Gizeh from '../images/cards/en/37-Gizeh.jpg'
import Tombouctou from '../images/cards/en/38-Tombouctou.jpg'
import Koush from '../images/cards/en/39-Koush.jpg'
import Aksoum from '../images/cards/en/40-Aksoum.jpg'
import Elmina from '../images/cards/en/41-Elmina.jpg'
import Douala from '../images/cards/en/42-Douala.jpg'
import Virunga from '../images/cards/en/43-Virunga.jpg'
import VictoriaFalls from '../images/cards/en/44-VictoriaFalls.jpg'
import Omatako from '../images/cards/en/45-Omatako.jpg'
import AtlanticOcean from '../images/cards/en/46-AtlanticOcean.jpg'
import Madagascar from '../images/cards/en/47-Madagascar.jpg'
import IndienOcean from '../images/cards/en/48-IndienOcean.jpg'
import Petra from '../images/cards/en/49-Petra.jpg'
import Babylone from '../images/cards/en/50-Babylone.jpg'
import Persepolis from '../images/cards/en/51-Persepolis.jpg'
import Sanaa from '../images/cards/en/52-Sanaa.jpg'
import CaspianSea from '../images/cards/en/53-CaspianSea.jpg'
import Zagorsk from '../images/cards/en/54-Zagorsk.jpg'
import PutoranaPlateau from '../images/cards/en/55-PutoranaPlateau.jpg'
import Novossibirsk from '../images/cards/en/56-Novossibirsk.jpg'
import Harappa from '../images/cards/en/57-Harappa.jpg'
import Sakha from '../images/cards/en/58-Sakha.jpg'
import LakeBaikal from '../images/cards/en/59-LakeBaikal.jpg'
import GreatWallOfChina from '../images/cards/en/60-GreatWallOfChina.jpg'
import MountEverest from '../images/cards/en/61-MountEverest.jpg'
import TajMahal from '../images/cards/en/62-TajMahal.jpg'
import Sigiriya from '../images/cards/en/63-Sigiriya.jpg'
import Bagan from '../images/cards/en/64-Bagan.jpg'
import AngkorVat from '../images/cards/en/65-AngkorVat.jpg'
import Xian from '../images/cards/en/66-Xian.jpg'
import AmurRiver from '../images/cards/en/67-AmurRiver.jpg'
import Kolyma from '../images/cards/en/68-Kolyma.jpg'
import BeringStraitCrossing from '../images/cards/en/69-BeringStraitCrossing.jpg'
import MountFuji from '../images/cards/en/70-MountFuji.jpg'
import Borobudur from '../images/cards/en/71-Borobudur.jpg'
import Sulawesi from '../images/cards/en/72-Sulawesi.jpg'
import PapuaNewGuinea from '../images/cards/en/73-PapuaNewGuinea.jpg'
import ArnhemLand from '../images/cards/en/74-ArnhemLand.jpg'
import BungleBungleRange from '../images/cards/en/75-BungleBungleRange.jpg'
import GreatBarrierReef from '../images/cards/en/76-GreatBarrierReef.jpg'
import Uluru from '../images/cards/en/77-Uluru.jpg'
import Perth from '../images/cards/en/78-Perth.jpg'
import Tasmania from '../images/cards/en/79-Tasmania.jpg'
import FiordlandNationalPark from '../images/cards/en/80-FiordlandNationalPark.jpg'

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
    [Place.Giza]: Gizeh,
    [Place.Timbuktu]: Tombouctou,
    [Place.Kush]: Koush,
    [Place.Aksum]: Aksoum,
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
    [Place.GreatWall]: GreatWallOfChina,
    [Place.MountEverest]: MountEverest,
    [Place.TajMahal]: TajMahal,
    [Place.Sigiriya]: Sigiriya,
    [Place.Bagan]: Bagan,
    [Place.AngkorVat]: AngkorVat,
    [Place.Xian]: Xian,
    [Place.AmurRiver]: AmurRiver,
    [Place.Kolyma]: Kolyma,
    [Place.BeringStrait]: BeringStraitCrossing,
    [Place.MountFuji]: MountFuji,
    [Place.Borobudur]: Borobudur,
    [Place.Sulawesi]: Sulawesi,
    [Place.Papua]: PapuaNewGuinea,
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

export const placeCardDescription = new PlaceCardDescription()

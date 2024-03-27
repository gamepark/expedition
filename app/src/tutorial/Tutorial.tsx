/** @jsxImportSource @emotion/react */
import { ClotheType, EyebrowType, EyeType, FacialHairType, GraphicType, MouthType, TopType } from '@gamepark/avataaars'
import ClotheColorName from '@gamepark/avataaars/dist/avatar/clothes/ClotheColorName'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import HairColorName from '@gamepark/avataaars/dist/avatar/top/HairColorName'
import Color from '@gamepark/expedition/Color'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { MaterialType } from '@gamepark/expedition/material/MaterialType'
import { Place, places } from '@gamepark/expedition/material/Place'
import { BlueNode, RedNode, StartNode } from '@gamepark/expedition/material/Road'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { isDeleteItemType, isMoveItem, isStartPlayerTurn, MaterialMove } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { Trans } from 'react-i18next'
import { boardDescription } from '../material/BoardDescription'
import { TutorialSetup } from './TutorialSetup'

export class Tutorial extends MaterialTutorial<Color, MaterialType, LocationType> {
  version = 2
  options = { players: [{ id: Color.Blue }, { id: Color.Red }] }
  setup = new TutorialSetup()

  players = [
    { id: Color.Blue },
    {
      id: Color.Red,
      avatar: {
        topType: TopType.LongHairBun,
        hairColor: HairColorName.BrownDark,
        facialHairType: FacialHairType.MoustacheFancy,
        clotheType: ClotheType.GraphicShirt,
        clotheColor: ClotheColorName.Red,
        graphicType: GraphicType.Hola,
        eyeType: EyeType.Happy,
        eyebrowType: EyebrowType.DefaultNatural,
        mouthType: MouthType.Smile,
        skinColor: SkinColor.Brown
      }
    }
  ]

  steps: TutorialStep<Color, MaterialType, LocationType>[] = [
    {
      popup: { text: () => <Trans defaults="tuto.welcome"><strong/></Trans> }
    },
    {
      popup: { text: (t: TFunction) => t('tuto.goal') }
    },
    {
      popup: { text: (t: TFunction) => t('tuto.cards') },
      focus: game => ({
        materials: [this.material(game, MaterialType.Card).player(Color.Blue)]
      })
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.place'),
        position: { x: 45, y: 0 }
      },
      focus: () => ({
        staticItems: [{ type: MaterialType.Board, item: boardDescription.staticItem }],
        locations: places.map(place => ({ type: LocationType.Place, id: place }))
      })
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.circles'),
        position: { x: 45, y: 0 }
      },
      focus: game => ({
        staticItems: [{ type: MaterialType.Board, item: boardDescription.staticItem }],
        locations: this.material(game, MaterialType.Card).player(Color.Blue).getItems().map(card => (
          { type: LocationType.Place, id: card.id }
        ))
      })
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.common'),
        position: { x: -20, y: 0 }
      },
      focus: game => ({
        materials: [this.material(game, MaterialType.Card).location(LocationType.CommonObjectives)],
        locations: this.material(game, MaterialType.Card).location(LocationType.CommonObjectives).getItems().map(card => (
          { type: LocationType.Place, id: card.id }
        ))
      })
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.tokens'),
        position: { x: 0, y: -25 }
      },
      focus: game => ({
        materials: [this.material(game, MaterialType.Token).player(Color.Blue)]
      })
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.tokens.canary'),
        position: { x: -15, y: -25 }
      },
      move: {
        filter: (move: MaterialMove) => isMoveItem(move) && move.location.id === Place.CanaryIslands
      },
      focus: () => ({
        locations: [{ type: LocationType.Place, id: Place.CanaryIslands }]
      })
    },
    {
      move: {
        player: Color.Red,
        filter: (move: MaterialMove) => isMoveItem(move) && move.location.id === Place.NorthwestPassage
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.tokens.opponent'),
        position: { x: -15, y: 25 }
      },
      focus: game => ({
        materials: [this.material(game, MaterialType.Token).location(LocationType.Place).locationId(Place.NorthwestPassage)]
      }),
      move: { player: Color.Blue }
    },
    { move: { player: Color.Red } },
    { move: { player: Color.Blue } },
    { move: { player: Color.Red } },
    { move: { player: Color.Blue } },
    { move: { player: Color.Red } },
    {
      popup: {
        text: (t: TFunction) => t('tuto.arrows')
      },
      focus: game => ({
        materials: [this.material(game, MaterialType.Arrow)],
        scale: 0.5
      })
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.start'),
        position: { x: -15, y: -25 }
      },
      focus: () => ({
        locations: [{ type: LocationType.Place, id: StartNode }]
      })
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.rome'),
        position: { x: -15, y: -25 }
      },
      focus: () => ({
        locations: [
          { type: LocationType.Place, id: Place.Rome },
          { type: LocationType.Road, id: [StartNode, Place.Rome] }
        ]
      }),
      move: {
        filter: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 0 && move.location.id[1] === Place.Rome
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.pass')
      },
      move: {
        filter: (move: MaterialMove) => isStartPlayerTurn(move)
      }
    },
    {
      move: {
        player: Color.Red,
        filter: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 1 && move.location.id[1] === Place.Thingvellir
      }
    },
    {
      move: {
        player: Color.Red,
        filter: (move: MaterialMove) => isStartPlayerTurn(move)
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.blue.goto'),
        position: { x: -15, y: -25 }
      },
      focus: () => ({
        locations: [
          { type: LocationType.Place, id: BlueNode.Rome_West },
          { type: LocationType.Road, id: [Place.Rome, BlueNode.Rome_West] }
        ]
      }),
      move: {
        filter: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 0 && move.location.id[1] === BlueNode.Rome_West
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.blue.replay'),
        position: { x: -15, y: -25 }
      },
      focus: game => ({
        locations: [
          { type: LocationType.Place, id: Place.CanaryIslands },
          { type: LocationType.Road, id: [BlueNode.Rome_West, Place.CanaryIslands] }
        ],
        materials: [this.material(game, MaterialType.Token).location(LocationType.Place).locationId(Place.CanaryIslands)]
      }),
      move: {
        filter: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 0 && move.location.id[1] === Place.CanaryIslands
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.canary.score'),
        position: { x: -15, y: -25 }
      },
      focus: game => ({
        materials: [
          this.material(game, MaterialType.Card).id(Place.CanaryIslands),
          this.material(game, MaterialType.Token).id(game.players[0]).location(LocationType.Card)
        ]
      }),
      move: {
        filter: (move: MaterialMove) => isStartPlayerTurn(move)
      }
    },
    {
      move: {
        player: Color.Red,
        filter: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 1 && move.location.id[1] === BlueNode.Thingvellir_West
      }
    },
    {
      move: {
        player: Color.Red,
        filter: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 1 && move.location.id[1] === Place.NorthwestPassage
      }
    },
    {
      move: {
        player: Color.Red,
        filter: (move: MaterialMove) => isStartPlayerTurn(move)
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.red.goto'),
        position: { x: -15, y: -25 }
      },
      focus: game => ({
        locations: [
          { type: LocationType.Place, id: RedNode.Tombouctou_West },
          { type: LocationType.Road, id: [Place.CanaryIslands, RedNode.Tombouctou_West] }
        ],
        materials: [this.material(game, MaterialType.Token).location(LocationType.Place).locationId(Place.CanaryIslands)]
      }),
      move: {
        filter: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 0 && move.location.id[1] === RedNode.Tombouctou_West
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.red.ticket'),
        position: { x: -10, y: 10 }
      },
      focus: game => ({
        materials: [this.material(game, MaterialType.Ticket).player(Color.Blue)],
        scale: 0.6
      }),
      move: {
        filter: (move: MaterialMove) => isDeleteItemType(MaterialType.Ticket)(move)
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.ticket'),
        position: { x: -15, y: -25 }
      },
      focus: game => ({
        locations: [
          { type: LocationType.Place, id: Place.PuertoRico },
          { type: LocationType.Road, id: [RedNode.Tombouctou_West, Place.PuertoRico] }
        ],
        materials: [this.material(game, MaterialType.Token).location(LocationType.Place).locationId(Place.PuertoRico)]
      }),
      move: {
        filter: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 0 && move.location.id[1] === Place.PuertoRico
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.gameOver')
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.loop"><strong/></Trans>
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.end')
      },
      move: {
        filter: (move: MaterialMove) => isStartPlayerTurn(move)
      }
    }
  ]
}

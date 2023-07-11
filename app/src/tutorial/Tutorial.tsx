/** @jsxImportSource @emotion/react */
import { TutorialSetup } from './TutorialSetup'
import { TFunction } from 'i18next'
import { isDeleteItem, isMoveItem, isStartPlayerTurn, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { Place, places } from '@gamepark/expedition/material/Place'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { ArrowColor } from '@gamepark/expedition/material/ArrowColor'
import { BlueNode, RedNode, StartNode } from '@gamepark/expedition/material/Road'
import { Trans } from 'react-i18next'
import { boardDescription } from '../material/BoardDescription'
import { AvatarProps, ClotheType, EyebrowType, EyeType, FacialHairType, GraphicType, MouthType, TopType } from '@gamepark/avataaars'
import HairColorName from '@gamepark/avataaars/dist/avatar/top/HairColorName'
import ClotheColorName from '@gamepark/avataaars/dist/avatar/clothes/ClotheColorName'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'

export class Tutorial extends MaterialTutorial<Color, MaterialType, LocationType> {
  options = { players: [{ id: Color.Blue }, { id: Color.Red }] }
  setup = new TutorialSetup()

  avatars: Partial<Record<Color, AvatarProps>> = {
    [Color.Red]: {
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

  steps: TutorialStep<Color, MaterialType, LocationType>[] = [
    {
      popup: { text: () => <Trans defaults="tuto.welcome" components={[<strong/>]}/> }
    },
    {
      popup: { text: (t: TFunction) => t('tuto.goal') }
    },
    {
      popup: { text: (t: TFunction) => t('tuto.cards') },
      focus: (game: MaterialGame) => this.material(game, MaterialType.Card).player(Color.Blue)
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.place'),
        position: { x: 45, y: 0 }
      },
      focus: () => [
        { type: MaterialType.Board, item: boardDescription.staticItem },
        ...places.map(place => this.location(LocationType.Place).id(place))
      ]
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.circles'),
        position: { x: 45, y: 0 }
      },
      focus: (game: MaterialGame) => [
        { type: MaterialType.Board, item: boardDescription.staticItem },
        ...this.material(game, MaterialType.Card).player(Color.Blue).getItems().map(card =>
          this.location(LocationType.Place).id(card.id)
        )
      ]
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.common'),
        position: { x: -20, y: 0 }
      },
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.Card).location(LocationType.CommonObjectives),
        ...this.material(game, MaterialType.Card).location(LocationType.CommonObjectives).getItems().map(card =>
          this.location(LocationType.Place).id(card.id)
        )
      ]
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.tokens'),
        position: { x: 0, y: -25 }
      },
      focus: (game: MaterialGame) => this.material(game, MaterialType.Token).player(Color.Blue)
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.tokens.canary'),
        position: { x: -15, y: -25 }
      },
      move: {
        filter: (move: MaterialMove) => isMoveItem(move) && move.position.location?.id === Place.CanaryIslands
      },
      focus: () => this.location(LocationType.Place).id(Place.CanaryIslands)
    },
    {
      move: {
        player: Color.Red,
        filter: (move: MaterialMove) => isMoveItem(move) && move.position.location?.id === Place.NorthwestPassage
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.tokens.opponent'),
        position: { x: -15, y: 25 }
      },
      focus: (game: MaterialGame) => this.material(game, MaterialType.Token).location(LocationType.Place).locationId(Place.NorthwestPassage),
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
      focus: () => this.location(LocationType.ArrowsStock).id(ArrowColor.Yellow)
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.start'),
        position: { x: -15, y: -25 }
      },
      focus: () => this.location(LocationType.Place).id(StartNode)
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.rome'),
        position: { x: -15, y: -25 }
      },
      focus: () => [this.location(LocationType.Place).id(Place.Rome), this.location(LocationType.Road).id([StartNode, Place.Rome])],
      move: {
        filter: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 0 && move.position.location?.id[1] === Place.Rome
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
        filter: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 1 && move.position.location?.id[1] === Place.Thingvellir
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
      focus: () => [this.location(LocationType.Place).id(BlueNode.Rome_West), this.location(LocationType.Road).id([Place.Rome, BlueNode.Rome_West])],
      move: {
        filter: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 0 && move.position.location?.id[1] === BlueNode.Rome_West
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.blue.replay'),
        position: { x: -15, y: -25 }
      },
      focus: (game: MaterialGame) => [
        this.location(LocationType.Place).id(Place.CanaryIslands),
        this.location(LocationType.Road).id([BlueNode.Rome_West, Place.CanaryIslands]),
        this.material(game, MaterialType.Token).location(LocationType.Place).locationId(Place.CanaryIslands)
      ],
      move: {
        filter: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 0 && move.position.location?.id[1] === Place.CanaryIslands
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.canary.score'),
        position: { x: -15, y: -25 }
      },
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.Card).id(Place.CanaryIslands),
        this.material(game, MaterialType.Token).id(game.players[0]).location(LocationType.Card)
      ],
      move: {
        filter: (move: MaterialMove) => isStartPlayerTurn(move)
      }
    },
    {
      move: {
        player: Color.Red,
        filter: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 1 && move.position.location?.id[1] === BlueNode.Thingvellir_West
      }
    },
    {
      move: {
        player: Color.Red,
        filter: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 1 && move.position.location?.id[1] === Place.NorthwestPassage
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
      focus: () => [
        this.location(LocationType.Place).id(RedNode.Tombouctou_West),
        this.location(LocationType.Road).id([Place.CanaryIslands, RedNode.Tombouctou_West])
      ],
      move: {
        filter: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 0 && move.position.location?.id[1] === RedNode.Tombouctou_West
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.red.ticket'),
        position: { x: -10, y: 10 }
      },
      focus: (game: MaterialGame) => this.material(game, MaterialType.Ticket).player(Color.Blue),
      move: {
        filter: (move: MaterialMove) => isDeleteItem(move, MaterialType.Ticket)
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.ticket'),
        position: { x: -15, y: -25 }
      },
      focus: (game: MaterialGame) => [
        this.location(LocationType.Place).id(Place.PuertoRico),
        this.location(LocationType.Road).id([RedNode.Tombouctou_West, Place.PuertoRico]),
        this.material(game, MaterialType.Token).location(LocationType.Place).locationId(Place.PuertoRico)
      ],
      move: {
        filter: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 0 && move.position.location?.id[1] === Place.PuertoRico
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.gameOver')
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.loop" components={[<strong/>]}/>
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

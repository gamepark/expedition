/** @jsxImportSource @emotion/react */
import { TutorialSetup } from './TutorialSetup'
import { TFunction } from 'i18next'
import { isDeleteItem, isMoveItem, isStartPlayerTurn, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { MaterialTutorial, TutorialFocusType, TutorialStep, TutorialStepType } from '@gamepark/react-game'
import { Place } from '@gamepark/expedition/material/Place'
import Color from '@gamepark/expedition/Color'
import { MaterialType } from '@gamepark/expedition/material/ExpeditionMaterial'
import { LocationType } from '@gamepark/expedition/material/LocationType'
import { ArrowColor } from '@gamepark/expedition/material/ArrowColor'
import { BlueNode, RedNode, StartNode } from '@gamepark/expedition/material/Road'
import { Trans } from 'react-i18next'

export class Tutorial extends MaterialTutorial<Color, MaterialType, LocationType> {
  options = { players: [{ id: Color.Blue }, { id: Color.Red }] }
  setup = new TutorialSetup()
  steps: TutorialStep<Color, MaterialType, LocationType>[] = [
    {
      type: TutorialStepType.Popup,
      text: () => <Trans defaults="tuto.welcome" components={[<strong/>]}/>
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.goal')
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.cards'),
      focus: (game: MaterialGame) => this.material(game, MaterialType.Card).player(Color.Blue),
      zoom: 2
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.place'),
      focus: () => this.location(LocationType.Place).id(Place.Rome)
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.circles'),
      focus: () => this.location(LocationType.Place).id(Place.CanaryIslands)
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.common'),
      focus: (game: MaterialGame) => this.material(game, MaterialType.Card).location(LocationType.CommonObjectives)
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.tokens'),
      focus: (game: MaterialGame) => this.material(game, MaterialType.Token).player(Color.Blue)
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.tokens.canary'),
      focus: () => this.location(LocationType.Place).id(Place.CanaryIslands)
    },
    {
      type: TutorialStepType.Move,
      isValidMove: (move: MaterialMove) => isMoveItem(move) && move.position.location?.id === Place.CanaryIslands
    },
    {
      type: TutorialStepType.Move,
      playerId: Color.Red,
      isValidMove: (move: MaterialMove) => isMoveItem(move) && move.position.location?.id === Place.NorthwestPassage
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.tokens.opponent'),
      focus: () => this.location(LocationType.Place).id(Place.NorthwestPassage)
    },
    { type: TutorialStepType.Move },
    { type: TutorialStepType.Move, playerId: Color.Red },
    { type: TutorialStepType.Move },
    { type: TutorialStepType.Move, playerId: Color.Red },
    { type: TutorialStepType.Move },
    { type: TutorialStepType.Move, playerId: Color.Red },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.arrows'),
      focus: () => this.location(LocationType.ArrowsStock).id(ArrowColor.Yellow)
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.start'),
      focus: () => this.location(LocationType.Place).id(StartNode)
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.rome'),
      focus: () => this.location(LocationType.Road).id([StartNode, Place.Rome])
    },
    {
      type: TutorialStepType.Move,
      isValidMove: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 0 && move.position.location?.id[1] === Place.Rome
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.pass'),
      focus: () => TutorialFocusType.Header
    },
    {
      type: TutorialStepType.Move,
      isValidMove: (move: MaterialMove) => isStartPlayerTurn(move)
    },
    {
      type: TutorialStepType.Move,
      playerId: Color.Red,
      isValidMove: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 1 && move.position.location?.id[1] === Place.Thingvellir
    },
    {
      type: TutorialStepType.Move,
      playerId: Color.Red,
      isValidMove: (move: MaterialMove) => isStartPlayerTurn(move)
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.blue.goto'),
      focus: () => this.location(LocationType.Place).id(BlueNode.Rome_West)
    },
    {
      type: TutorialStepType.Move,
      isValidMove: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 0 && move.position.location?.id[1] === BlueNode.Rome_West
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.blue.replay'),
      focus: () => this.location(LocationType.Road).id([BlueNode.Rome_West, Place.CanaryIslands])
    },
    {
      type: TutorialStepType.Move,
      isValidMove: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 0 && move.position.location?.id[1] === Place.CanaryIslands
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.canary.score'),
      focus: (game: MaterialGame) => this.material(game, MaterialType.Card).id(Place.CanaryIslands)
    },
    {
      type: TutorialStepType.Move,
      isValidMove: (move: MaterialMove) => isStartPlayerTurn(move)
    },
    {
      type: TutorialStepType.Move,
      playerId: Color.Red,
      isValidMove: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 1 && move.position.location?.id[1] === BlueNode.Thingvellir_West
    },
    {
      type: TutorialStepType.Move,
      playerId: Color.Red,
      isValidMove: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 1 && move.position.location?.id[1] === Place.NorthwestPassage
    },
    {
      type: TutorialStepType.Move,
      playerId: Color.Red,
      isValidMove: (move: MaterialMove) => isStartPlayerTurn(move)
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.red.goto'),
      focus: () => this.location(LocationType.Place).id(RedNode.Tombouctou_West)
    },
    {
      type: TutorialStepType.Move,
      isValidMove: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 0 && move.position.location?.id[1] === RedNode.Tombouctou_West
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.red.ticket'),
      focus: (game: MaterialGame) => this.material(game, MaterialType.Ticket).player(Color.Blue)
    },
    {
      type: TutorialStepType.Move,
      isValidMove: (move: MaterialMove) => isDeleteItem(move, MaterialType.Ticket)
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.ticket'),
    },
    {
      type: TutorialStepType.Move,
      isValidMove: (move: MaterialMove) => isMoveItem(move) && move.itemIndex === 0 && move.position.location?.id[1] === Place.PuertoRico
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.gameOver')
    },
    {
      type: TutorialStepType.Popup,
      text: () => <Trans defaults="tuto.loop" components={[<strong/>]}/>
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.end')
    }

  ]
}
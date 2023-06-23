/** @jsxImportSource @emotion/react */
import { TutorialSetup } from './TutorialSetup'
import { TFunction } from 'i18next'
import { isDeleteItem, isMoveItem, isStartPlayerTurn, MaterialMove } from '@gamepark/rules-api'
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
      text: (t: TFunction) => t('tuto.welcome')
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.goal')
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.cards'),
      focus: () => this.material(MaterialType.Card).player(Color.Blue)
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
      focus: () => this.material(MaterialType.Card).location(LocationType.CommonObjectives).location(location => location.x === 2)
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.tokens'),
      focus: () => this.material(MaterialType.Token).player(Color.Blue)
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.tokens.newfoundland'),
      focus: () => this.location(LocationType.Place).id(Place.CanaryIslands)
    },
    {
      type: TutorialStepType.Move,
      move: (moves: MaterialMove[]) => moves.find(move => isMoveItem(move) && move.position.location?.id === Place.CanaryIslands)
    },
    {
      type: TutorialStepType.Move,
      playerId: Color.Red,
      move: (moves: MaterialMove[]) => moves.find(move => isMoveItem(move) && move.position.location?.id === Place.Madagascar)
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.tokens.opponent'),
      focus: () => this.location(LocationType.Place).id(Place.Madagascar)
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
      text: (t: TFunction) => t('tuto.thingvellir'),
      focus: () => this.location(LocationType.Road).id([StartNode, Place.Rome])
    },
    {
      type: TutorialStepType.Move,
      move: (moves: MaterialMove[]) => moves.find(move => isMoveItem(move) && move.itemIndex === 0 && move.position.location?.id[1] === Place.Rome)
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.pass'),
      focus: () => TutorialFocusType.Header
    },
    {
      type: TutorialStepType.Move,
      move: (moves: MaterialMove[]) => moves.find(move => isStartPlayerTurn(move))
    },
    {
      type: TutorialStepType.Move,
      playerId: Color.Red,
      move: (moves: MaterialMove[]) => moves.find(move => isMoveItem(move) && move.itemIndex === 1 && move.position.location?.id[1] === Place.Athens)
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.blue.goto'),
      focus: () => this.location(LocationType.Place).id(BlueNode.Rome_West)
    },
    {
      type: TutorialStepType.Move,
      move: (moves: MaterialMove[]) => moves.find(move => isMoveItem(move) && move.itemIndex === 0 && move.position.location?.id[1] === BlueNode.Rome_West)
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.blue.replay'),
      focus: () => this.location(LocationType.Road).id([BlueNode.Rome_West, Place.CanaryIslands])
    },
    {
      type: TutorialStepType.Move,
      move: (moves: MaterialMove[]) => moves.find(move => isMoveItem(move) && move.itemIndex === 0 && move.position.location?.id[1] === Place.CanaryIslands)
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.newfoundland.score'),
      focus: () => this.material(MaterialType.Card).id(Place.CanaryIslands)
    },
    {
      type: TutorialStepType.Move,
      move: (moves: MaterialMove[]) => moves.find(move => isStartPlayerTurn(move))
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.red.goto'),
      focus: () => this.location(LocationType.Place).id(RedNode.Tombouctou_West)
    },
    {
      type: TutorialStepType.Move,
      move: (moves: MaterialMove[]) => moves.find(move => isMoveItem(move) && move.itemIndex === 0 && move.position.location?.id[1] === RedNode.Tombouctou_West)
    },
    {
      type: TutorialStepType.Popup,
      text: (t: TFunction) => t('tuto.red.ticket'),
      focus: () => this.material(MaterialType.Ticket).player(Color.Blue)
    },
    {
      type: TutorialStepType.Move,
      move: (moves: MaterialMove[]) => moves.find(move => isDeleteItem(move, MaterialType.Ticket))
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
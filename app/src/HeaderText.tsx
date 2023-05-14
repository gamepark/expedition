/** @jsxImportSource @emotion/react */
import { getPlayerName } from '@gamepark/expedition/ExpeditionOptions'
import { PlayMoveButton, useLegalMoves, usePlayerId } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { MaterialGame, MaterialRulesMove, MoveKind } from '@gamepark/rules-api'
import { RulesStep } from '@gamepark/expedition/rules/RulesStep'
import { css } from '@emotion/react'

type Props = {
  loading: boolean
  game?: MaterialGame
}

export default function HeaderText({ loading }: Props) {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const legalMoves = useLegalMoves<MaterialRulesMove>()
  if (loading) return <>{t('Game loading...')}</>
  const passMove = legalMoves.find(move => move.kind === MoveKind.RulesMove && move.step === RulesStep.PlayerTurn)
  return <>Loaded! Now what? Your player id is {getPlayerName(playerId, t)}
    {passMove && <PlayMoveButton move={passMove} css={passButtonCss}>Pass</PlayMoveButton>}
  </>
}

const passButtonCss = css`
  color: white;
  border-color: white;
  padding: 0 0.5em;
  margin-left: 0.5em;
`
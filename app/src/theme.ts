import { css } from '@emotion/react'
import { BottomBarNavigation, buttonCss, GameTheme } from '@gamepark/react-game'

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Vintage cartography palette — inspired by the world-map board and the explorer/adventure feel of the rules booklet
const ink = '#3a2616'              // sepia ink on parchment
const parchment = '#f4ead2'        // aged paper
const compassBrass = '#b87333'     // warm copper compass accent
const compassBrassHover = '#a3641f'
const compassBrassActive = '#85501a'
const oceanDeep = '#1d4663'        // deep ocean blue
const oceanMid = '#2d6a8e'

export const expeditionTheme: DeepPartial<GameTheme> = {
  root: {
    fontFamily: '"Cinzel", "Trajan Pro", "Cormorant Garamond", Georgia, serif'
  },
  dialog: {
    backgroundColor: parchment,
    color: ink,
    container: css`
      border-radius: 0.4em;
      background-image:
        radial-gradient(ellipse at top left, rgba(184, 115, 51, 0.10), transparent 60%),
        radial-gradient(ellipse at bottom right, rgba(29, 70, 99, 0.06), transparent 70%),
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6'%3E%3Crect width='6' height='6' fill='%23e6d8b4' fill-opacity='0.20'/%3E%3Ccircle cx='1' cy='1' r='0.55' fill='%23a37a3a' fill-opacity='0.07'/%3E%3Ccircle cx='4' cy='3' r='0.45' fill='%238b561e' fill-opacity='0.05'/%3E%3C/svg%3E");
      box-shadow:
        0 0 0 1px rgba(58, 38, 22, 0.18),
        0 0 24px rgba(184, 115, 51, 0.08),
        0 10px 32px rgba(0, 0, 0, 0.30),
        inset 0 1px 0 rgba(255, 250, 235, 0.65);
    `,
    navigation: BottomBarNavigation,
    buttons: buttonCss(compassBrass, 'rgba(184, 115, 51, 0.12)', 'rgba(184, 115, 51, 0.22)'),
    content: css`
      > h2 {
        color: ${compassBrass};
        font-family: 'Cinzel', 'Trajan Pro', Georgia, serif;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
    `
  },
  palette: {
    primary: compassBrass,
    primaryHover: compassBrassHover,
    primaryActive: compassBrassActive,
    primaryLight: 'rgba(184, 115, 51, 0.10)',
    primaryLighter: 'rgba(184, 115, 51, 0.05)',
    surface: parchment,
    onSurface: ink,
    onSurfaceFocus: 'rgba(184, 115, 51, 0.14)',
    onSurfaceActive: 'rgba(184, 115, 51, 0.22)',
    danger: '#a83232',
    dangerHover: '#fbe2e2',
    dangerActive: '#f5cccc',
    disabled: '#a89a78'
  },
  header: {
    bar: css`
      background: linear-gradient(90deg, ${oceanDeep} 0%, ${oceanMid} 55%, ${compassBrass} 100%);
      color: ${parchment};
      border-bottom: 2px solid ${compassBrass};
      box-shadow:
        0 4px 14px rgba(0, 0, 0, 0.40),
        inset 0 1px 0 rgba(255, 235, 200, 0.20);
      font-family: 'Cinzel', 'Trajan Pro', Georgia, serif;
      letter-spacing: 0.03em;
    `,
    buttons: css`
      ${buttonCss(parchment, 'rgba(244, 234, 210, 0.18)', 'rgba(244, 234, 210, 0.32)')};
      padding: 0 0.6em;
      font-weight: 600;
      letter-spacing: 0.04em;
    `
  },
  menu: {
    mainButton: css`
      background: ${compassBrass} !important;
      box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 235, 200, 0.30);
    `,
    popButton: css`
      color: ${compassBrass};
      background: ${parchment};

      &:focus, &:hover {
        background: ${compassBrass};
        color: ${parchment};
      }

      &:active {
        background: ${compassBrassActive};
        color: ${parchment};
      }
    `,
    panel: css`
      box-shadow:
        0 2px 14px rgba(0, 0, 0, 0.18),
        inset 0 1px 0 rgba(255, 250, 235, 0.55);
    `
  },
  journal: {
    tab: css`
      font-family: 'Cinzel', 'Trajan Pro', Georgia, serif;
      letter-spacing: 0.04em;
    `,
    tabSelected: css`
      color: ${parchment};
    `,
    historyEntry: css`
      border-radius: 0.4em;
      border-left: 3px solid ${compassBrass};
      background: rgba(184, 115, 51, 0.07);
      color: ${ink};
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    `,
    chatBar: css`
      background: linear-gradient(90deg, ${oceanDeep} 0%, ${compassBrass} 100%);
    `
  },
  result: {
    border: compassBrass,
    icon: compassBrass,
    container: css`
      border-radius: 0.4em;
    `
  },
  tutorial: {
    container: css`
      border-radius: 0.4em;
      box-shadow:
        0 0 24px rgba(184, 115, 51, 0.10),
        0 4px 22px rgba(0, 0, 0, 0.22),
        inset 0 1px 0 rgba(255, 250, 235, 0.55);
    `
  },
  playerPanel: {
    activeRingColors: [compassBrass, '#e8c97a']
  },
  timeStats: {
    thinkBackground: 'rgba(184, 115, 51, 0.10)',
    waitBackground: 'rgba(120, 140, 160, 0.10)'
  }
}

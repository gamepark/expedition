import { ListLocator } from '@gamepark/react-game'

export class CommonObjectivesLocator extends ListLocator {
  coordinates = { x: -51, y: -28.5 }
  gap = { y: 9.4 }

  getHoverTransform() {
    return ['translateZ(10em)', 'translateY(2em)', 'scale(2)']
  }
}

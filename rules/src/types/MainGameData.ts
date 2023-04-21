import { ArrowColor } from '../material/ArrowColor'
import { Node } from '../material/Road'

export type MainGameData = {
  expeditions: Record<ArrowColor, Node | undefined>
}

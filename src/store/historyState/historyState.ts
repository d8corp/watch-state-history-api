import { State } from 'watch-state'

export interface HistoryStep {
  url: string
  position: number
}

export interface HistoryState {
  steps: HistoryStep[]
}

export const historyState = new State(getHistoryStateRaw())

export function getHistoryStateRaw (): HistoryState {
  return window.history.state ?? {
    steps: [],
  }
}

export function updateHistoryState () {
  historyState.value = getHistoryStateRaw()
}

window.addEventListener('popstate', updateHistoryState)

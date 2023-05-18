import { Cache } from 'watch-state'

import { historyState } from '../historyState'

let _lastLength = 0

export type HistoryMovement = 'back' | 'forward' | 'same'

export const historyMovement = new Cache<HistoryMovement>(() => {
  const currentLength = historyState.value.steps.length
  const lastLength = _lastLength
  _lastLength = currentLength

  if (currentLength > lastLength) return 'forward'
  if (currentLength < lastLength) return 'back'

  return 'same'
})

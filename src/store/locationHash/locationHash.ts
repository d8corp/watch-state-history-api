import { Cache } from 'watch-state'

import { historyState } from '../historyState'

export const locationHash = new Cache(() => historyState.value && window.location.hash)

import { Cache } from 'watch-state'

import { historyState } from '../historyState'

export const locationPath = new Cache(() => historyState.value && window.location.pathname)

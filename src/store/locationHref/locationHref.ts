import { Cache } from 'watch-state'

import { historyState } from '../historyState'

export const locationHref = new Cache(() => historyState.value && window.location.href)

import { Cache } from 'watch-state'

import { historyState } from '../historyState'

export const locationSearch = new Cache(() => historyState.value && window.location.search)

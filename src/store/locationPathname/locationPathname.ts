import { Cache } from 'watch-state'

import { historyState } from '../historyState'

export const locationPathname = new Cache(() => historyState.value && window.location.pathname)

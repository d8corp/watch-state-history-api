import { Cache } from 'watch-state'

import { historyState } from '../historyState'

export const locationURL = new Cache(() => historyState.value && `${window.location.pathname}${window.location.search}${window.location.hash}`)

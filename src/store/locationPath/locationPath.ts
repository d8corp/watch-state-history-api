import { Compute } from 'watch-state'

import { historyState } from '../historyState'

export const locationPath = new Compute(() => historyState.value && window.location.pathname)

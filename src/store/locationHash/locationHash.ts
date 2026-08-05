import { Compute } from 'watch-state'

import { historyState } from '../historyState'

export const locationHash = new Compute(() => historyState.value && window.location.hash)

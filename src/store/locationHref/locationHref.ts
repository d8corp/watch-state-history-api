import { Compute } from 'watch-state'

import { historyState } from '../historyState'

export const locationHref = new Compute(() => historyState.value && window.location.href)

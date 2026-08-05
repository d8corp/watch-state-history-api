import { Compute } from 'watch-state'

import { historyState } from '../historyState'

export const locationURL = new Compute(() => historyState.value && `${window.location.pathname}${window.location.search}${window.location.hash}`)

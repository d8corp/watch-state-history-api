import { Cache } from 'watch-state'

import { locationSearch } from '../locationSearch'

export const urlSearchParams = new Cache(() => new URLSearchParams(locationSearch.value))

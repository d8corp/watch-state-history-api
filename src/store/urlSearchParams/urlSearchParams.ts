import { Compute } from 'watch-state'

import { locationSearch } from '../locationSearch'

export const urlSearchParams = new Compute(() => new URLSearchParams(locationSearch.value))

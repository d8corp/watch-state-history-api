import { Cache } from 'watch-state'

import { urlSearchParams } from '../../store'

const cache: Record<string, Cache<string>> = Object.create(null)

export function getSearchParam (key: string) {
  if (key in cache) return cache[key]
  return (cache[key] = new Cache(() => urlSearchParams.value.get(key) || ''))
}

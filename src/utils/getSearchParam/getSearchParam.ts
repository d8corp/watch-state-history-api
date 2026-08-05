import { Compute } from 'watch-state'

import { urlSearchParams } from '../../store'

const cache: Record<string, Compute<string>> = Object.create(null)

export function getSearchParam (key: string) {
  if (key in cache) return cache[key]
  return (cache[key] = new Compute(() => urlSearchParams.value.get(key) || ''))
}

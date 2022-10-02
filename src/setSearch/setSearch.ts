import parseUrl from '../parseUrl'

export default function setSearch (url: string, key: string | Record<string, string | undefined | number | boolean>, value?: string | number | boolean): string {
  if (typeof key === 'object') {
    for (const param in key) {
      url = setSearch(url, param, key[param])
    }
    return url
  }

  if (value === undefined) {
    const { path = '', search = '', hash = '' } = parseUrl(url)
    const newSearch = search.replace(new RegExp(`(^|&)${key}(=[^&]*)?(&|$)`), '&').replace(/(^&|&$)/, '')
    return path + (newSearch ? '?' + newSearch : '') + (hash ? '#' + hash : '')
  }

  const { path = '', search = '', hash = '' } = parseUrl(url)
  let newSearch = ''

  const containsKey = new RegExp(`(^|&)${key}(=|&|$)`).test(search)
  const postKey = value ? `=${value}` : ''

  if (containsKey) {
    newSearch = search.replace(new RegExp(`(^|&)${key}(=|=[^&]*)?(&|$)`), `$1${key}${postKey}$3`)
  } else {
    newSearch = `${search ? search + '&' : ''}${key}${postKey}`
  }

  return path + (newSearch ? '?' + newSearch : '') + (hash ? '#' + hash : '')
}

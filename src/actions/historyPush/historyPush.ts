import scroll from 'web-scroll'

import { updateHistoryState } from '../../store/historyState'

export function historyPush (url: string, position: number | string = 0): Promise<undefined> {
  const sameUrl = url === `${window.location.pathname}${window.location.search}${window.location.hash}`

  return new Promise(resolve => {
    scroll(position, () => {
      if (!sameUrl) {
        const top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

        window.history.pushState({
          steps: [...(window.history.state?.steps || []), {
            url,
            position: top,
          }],
        }, '', url)

        updateHistoryState()
      }

      resolve(undefined)
    })
  })
}

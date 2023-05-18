import scroll from 'web-scroll'

import { updateHistoryState } from '../../store/historyState'

export function historyReplace (url: string, position: number | string = 0): Promise<undefined> {
  const sameUrl = url === window.location.href

  return new Promise(resolve => {
    scroll(position, () => {
      if (!sameUrl) {
        const top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

        window.history.replaceState({
          steps: [...window.history.state?.steps?.slice(0, -1), {
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

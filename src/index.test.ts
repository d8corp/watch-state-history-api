import { Watch } from 'watch-state'

import { historyPush, locationPath, locationURL, updateHistoryState } from '.'

function resetHistory (url = '/') {
  window.history.pushState(null, '', url)
  updateHistoryState()
}

describe('history-api', () => {
  describe('locationHref', () => {
    it('simple', () => {
      resetHistory('/')
      expect(locationPath.value).toBe('/')
      expect(locationURL.value).toBe('/')
    })
    it('keep slash', async () => {
      resetHistory('/')
      expect(locationURL.value).toBe('/')

      await historyPush('?test=1')

      expect(locationURL.value).toBe('/?test=1')
    })
    it('watch', async () => {
      resetHistory('/')
      const log = jest.fn()

      new Watch(() => {
        log(locationURL.value)
      })

      expect(log).toBeCalledTimes(1)
      expect(log).toHaveBeenNthCalledWith(1, '/')

      await historyPush('?test=1')

      expect(log).toBeCalledTimes(2)
      expect(log).toHaveBeenNthCalledWith(2, '/?test=1')
    })
  })
})

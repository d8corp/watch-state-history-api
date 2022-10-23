/* global location */

import { cache, event, state } from '@watch-state/decorators'
import { Cache } from 'watch-state'
import scroll from 'web-scroll'

import { version } from '../package.json'

export type Step = {
  url: string
  position: number
}
export type Steps = Step[]
export type State = {
  key: string
  steps: Steps
}
export type BackChk = (url: string) => boolean

export class History {
  constructor (locales = '', key = 'history-api ' + version) {
    this.locales = locales
    this.key = key
    this.defaultState = {
      key,
      steps: [],
    }

    const { state } = window.history
    if (state?.key === key) {
      this.state = state
    } else {
      this.state = this.defaultState
    }

    const listener = ({ state }) => this.onChange(state)
    window.addEventListener('popstate', listener)
    this.destructor = () => window.removeEventListener('popstate', listener)
  }

  readonly destructor: () => void
  protected readonly defaultState: State
  protected readonly key: string

  protected getCache: {[reg: number]: {[index: string]: Cache<string>}}
  protected isCache: {[reg: string]: Cache<boolean>}

  @state movement: 'back' | 'forward' | undefined
  @state state: State
  @state locales: string
  @state protected _url: string = location.pathname + location.search + location.hash

  @event protected onChange (state: State) {
    const { pathname, search, hash } = location
    const oldState = this.state
    this.state = state && this.key === state.key ? state : this.defaultState
    this._url = pathname + search + hash
    if (!state || this.key !== state.key || (oldState && this.key === oldState.key && oldState.steps.length > state.steps.length)) {
      this.movement = 'back'
      scroll({
        position: oldState.steps[oldState.steps.length - 1].position,
        attempts: 3,
      })
    } else {
      this.movement = 'forward'
    }
  }

  @cache get locale (): string {
    const { locales } = this
    if (locales) {
      const match = this._url.match(new RegExp(`^/(${locales})(/|\\?|#|$)`))
      return match ? match[1] : ''
    }
    return ''
  }

  set locale (locale: string) {
    const { locales, locale: currentLocale } = this
    if (locales && locale !== currentLocale && (!locale || new RegExp(`^(${locales})$`).test(locale))) {
      const { url, state: { steps } } = this
      const position = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      this.changeState(newUrl => {
        window.history.pushState({
          key: this.key,
          steps: [...steps, {
            url,
            position,
          }],
        }, null, newUrl)
        this.onChange(window.history.state)
      }, locale, url, -1)
    }
  }

  get localUrl (): string {
    return this._url
  }

  @cache get url (): string {
    const { locales, _url } = this
    return decodeURI(locales ? _url.replace(new RegExp(`^/(${locales})((/)|(\\?|#|$))`), '/$4') : _url)
  }

  @cache get path (): string {
    return this.url.replace(/[?#].*/, '')
  }

  @cache get hash (): string {
    const math = this.url.match(/^[^#]*#(.+)/)
    return math ? math[1] : ''
  }

  @cache get href (): string {
    return this.url.replace(/#.*/, '')
  }

  @cache get search (): string {
    const math = this.url.match(/^[^#?]*\?([^#]+)/)
    return math ? math[1] : ''
  }

  getSearch (key: string): string {
    return this.get(`^[^?#]*\\?([^#]*\\&)*${key}=([^#&]*)`, 2)
  }

  back (is?: RegExp | BackChk, def = '/', scrollFirst = false): this {
    if (is) {
      if (typeof is !== 'function') {
        const regexp = is
        is = url => regexp.test(url)
      }
      const { steps } = this.state
      for (let i = steps.length - 1; i > -1; i--) {
        const step = steps[i]
        if (is(step.url)) {
          return this.push(step.url, step.position, scrollFirst)
        }
      }
      this.push(def, 0, scrollFirst)
    } else if (scrollFirst) {
      const { steps } = this.state
      scroll(steps[steps.length - 1].position, () => window.history.back())
    } else {
      window.history.back()
    }
    return this
  }

  forward (): this {
    window.history.forward()
    return this
  }

  go (delta: number): this {
    window.history.go(delta)
    return this
  }

  replace (url: string, position: number | string = 0, scrollFirst = false): this {
    this.changeState(newUrl => {
      window.history.replaceState(this.state, null, newUrl)
    }, this.locale, url, position, scrollFirst)
    this.onChange(window.history.state)
    return this
  }

  push (url: string, position: number | string = 0, scrollFirst = false): this {
    const { url: currentUrl, state: { steps } } = this
    const top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    this.changeState(newUrl => {
      if (currentUrl !== url) {
        window.history.pushState({
          key: this.key,
          steps: [...steps, {
            url: currentUrl,
            position: top,
          }],
        }, null, newUrl)
        this.onChange(window.history.state)
      }
    }, this.locale, url, position, scrollFirst)
    return this
  }

  is (reg: string): boolean {
    if (!this.isCache) {
      this.isCache = {}
    }
    if (!this.isCache[reg]) {
      const regExp = new RegExp(reg)
      this.isCache[reg] = new Cache(() => regExp.test(this.url), true)
    }
    return this.isCache[reg].value
  }

  get (reg: string, index = 0, defaultValue = ''): string {
    if (!this.getCache) {
      this.getCache = {}
    }
    if (!this.getCache[index]) {
      this.getCache[index] = {}
    }
    if (!this.getCache[index][reg]) {
      const regExp = new RegExp(reg)
      this.getCache[index][reg] = new Cache(() => {
        const result = regExp.exec(this.url)
        return result ? result[index] || '' : defaultValue
      }, true)
    }
    return this.getCache[index][reg].value
  }

  protected changeState (callback: (newUrl: string) => void, locale: string, url: string, position: number | string, scrollFirst?: boolean): void {
    const mainCallback = () => {
      if (locale) {
        const match = url.match(/^([^?#]*)(.*)/)
        callback(match[1] === '/' ? `/${locale}${match[2]}` : `/${locale}${url}`)
      } else {
        callback(url)
      }
    }
    if (scrollFirst) {
      scroll(position, mainCallback)
    } else {
      mainCallback()
      scroll(position)
    }
  }
}

export default History

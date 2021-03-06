<a href="https://www.npmjs.com/package/watch-state">
  <img src="https://raw.githubusercontent.com/d8corp/watch-state/v3.3.3/img/logo.svg" align="left" width="90" height="90" alt="Watch-State logo by Mikhail Lysikov">
</a>

# &nbsp; @watch-state/history-api

&nbsp;  

[![NPM](https://img.shields.io/npm/v/@watch-state/history-api.svg)](https://www.npmjs.com/package/@watch-state/history-api)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@watch-state/history-api)](https://bundlephobia.com/result?p=@watch-state/history-api)
[![downloads](https://img.shields.io/npm/dm/@watch-state/history-api.svg)](https://www.npmtrends.com/@watch-state/history-api)
[![changelog](https://img.shields.io/badge/changelog-⋮-brightgreen)](https://changelogs.xyz/@watch-state/history-api)
[![license](https://img.shields.io/npm/l/@watch-state/history-api)](https://github.com/d8corp/watch-state-history-api/blob/main/LICENSE)

Browser History API with [watch-state](https://www.npmjs.com/package/watch-state).

[![stars](https://img.shields.io/github/stars/d8corp/watch-state-history-api?style=social)](https://github.com/d8corp/watch-state-history-api/stargazers)
[![watchers](https://img.shields.io/github/watchers/d8corp/watch-state-history-api?style=social)](https://github.com/d8corp/watch-state-history-api/watchers)

### Installation

npm
```bash
npm i @watch-state/history-api
```

yarn
```bash
yarn add @watch-state/history-api
```

### Using

To start working with watch-state History API just get an instance of `History`.
```javascript
import History from '@watch-state/history-api'

const history = new History()
```

## Fields
### url ![string](https://img.shields.io/badge/-string-green)

This is an observable field, returns current relative URL includes pathname, search and hash.  
```javascript
history.url // current url
```
*`url` does not include locale and every time starts from `/`*

### path ![string](https://img.shields.io/badge/-string-green)

This is an observable field, returns current pathname of URL.  
```javascript
history.path // current pathname
``` 
*`path` does not include locale*

### hash ![string](https://img.shields.io/badge/-string-green)

This is an observable field, returns current hash of URL.  
```javascript
history.hash
```  

### href ![string](https://img.shields.io/badge/-string-green)

This is an observable field, returns current path + search of URL.
```javascript
history.href
```
*`href` does not include locale*

### locales ![string](https://img.shields.io/badge/-string-green)

This is an observable and writable field.  
Use this field when you wanna have locale prefix in the url.
```javascript
history.locales = 'en|fr|ru'
```

Or you can provide `locales` via constructor.
```javascript
const history = new History('ru|en|de')
```

### locale ![string](https://img.shields.io/badge/-string-green)

This is an observable and writable field, returns current locale of URL.
```javascript
history.locales // returns empty string by default
history.locales = 'en|ru'

history.locale // returns empty string by default

history.push('/test')

history.url // '/test'
location.pathname // '/test'

history.locale = 'ru'

history.url // '/test'
location.pathname // '/ru/test'

history.locales = ''

history.url // '/ru/test'
location.pathname // '/ru/test'
location.locale // ''
```

### localUrl ![string](https://img.shields.io/badge/-string-green)

This is just current url with the locale
```javascript
history.localUrl // '/'

history.locale = 'ru'

history.localUrl // '/ru'
```

### movement ![string](https://img.shields.io/badge/-"forvard"-green) ![string](https://img.shields.io/badge/-"back"-green) ![undefined](https://img.shields.io/badge/-undefined-orange)

This is an observable field, returns `undefined` if you just load the page.
When you moved through history the field changes to the status of the moving.  
```javascript
// history.movement === undefined

history.push('/test')

// history.movement === 'forward'

history.back()

// history.movement === 'back'
```

### state ![object](https://img.shields.io/badge/-object-orange)

This is an observable field, returns the state of history api.  
`state` equals `window.history.state` when number of `steps` more than 1.
```javascript
history.state // {key: '...', steps: [{...}]}

history.push('/test')

history.state // {key: '...', steps: [{...}, {...}]}
```

## Methods
### search

This is an observable method.  
That means you can use the method inside a watcher of `watch-state`,
when result of the function changed the `reaction` be called.  

The method returns the value of the provided `key` in the URL query.   
`search(key: string): string`
```javascript
history.search('key') // returns 'value' for url equals '?key=value'
```

### push

You can push to history any URL and you be moved forward in the history.  
`push(url: string, position: number | string = 0, scrollFirst = false): this`
```javascript
history.push('/test')
``` 

By default any time when you push a new URL the page scrolls up to position `0`.
If you wanna custom scroll the page after the pushing you can provide the second argument as a position of scroll.
```javascript
history.push('/test', 200)

history.push('/', '#root')
```

If you do not want to scroll, provide `-1` as a position of scrolling.  
If you wanna scroll first with `scroll-behavior` equals `smooth`, provide `true` to the third argument.
```javascript
history.push('/test', 0, true)
```

### back

You can move back like you click on back button in your browser.  
`back(reg?: RegExp | BackChk, def = '/', scrollFirst = false): this`
```javascript
history.back()
```

With the method, you can push to history a position which was before.
Just provide an argument to the method.
The argument should be regex to test previous states.
```javascript
history.back(/.*/) // push any previous url
```

You can handle all previous steps by function
```javascript
history.back(url => url !== '/test')
// push any previous url except for '/test'
```

The second argument is used when nothing found in history.  
The third argument works the same as the third of `push`.

### replace

You can replace url on current history position with `replace`.  
`replace(url: string, position: number | string = 0, scrollFirst = false): this`
```javascript
history.push('/test1')
history.push('/test2')

history.replace('/test3')

history.back()
this.url // `/test1`

history.forward()
this.url // `/test3`
```

### go

You can move to any position of history with method `go`.  
`go(delta: number): this`
```javascript
history.go(-1) // the same back()
```

### forward

You can move forward like you click on forward button in your browser.  
`forward(): this`
```javascript
history.forward()
```

### is

This is observable method.
This method just returns result of regex testing which provided to the method.  
`is(reg: string): boolean`
```javascript
history.is('^/$') // true if this is home page
```

The regexp tests `url` field of `history`. That means `is` don't include `locale`.

### get

This method is the same as method `is`, but returns result of matching.  
`get(reg: string, index = 0, defaultValue = ''): string`
```javascript
history.get('^/user/([0-9]+)$')
// returns current url if it matches the regex, otherwise empty string
```

The second argument is used for get information inside round brackets.
```javascript
history.get('^/user/([0-9]+)$', 1)
// returns current user if url matches the regex, otherwise empty string
```

### destructor

If you finished working with history and wanna get rid of it, just run `destructor` method.  
`destructor()`
```javascript
history.destructor()
```

## Utils
### decode

Just decodes URL to string
```javascript
import {decode} from '@watch-state/history-api'

decode(location.href)
```

### parseUrl

Returns an object with `path`, `search` and `hash` fields of relative URL
```javascript
import {parseUrl} from '@watch-state/history-api'

parseUrl(location.pathname + location.search + location.hash)
```

### setSearch

Sets search value to relative URL
```javascript
import {setSearch} from '@watch-state/history-api'

setSearch('/test', 'key', 'value') // "/test?key=value"
```

Use 2 arguments to remove a key.
```javascript
import {setSearch} from '@watch-state/history-api'

setSearch('/test?key=value', 'key') // "/test"
```

Use an object as the second argument to set several options
```javascript
import {setSearch} from '@watch-state/history-api'

setSearch('/test?key=value', {key: undefined, test: 1}) // "/test?test=1"
```

### scroll

You can scroll the current page with `scroll` function.  
`scroll(position: number | string, callback?: function): this`
```javascript
import {scroll} from '@watch-state/history-api'

scroll(100)
```

If you wanna scroll the page to a defined element you can provide CSS selector to find the element and scroll to view it.
```javascript
import scroll from '@watch-state/history-api/scroll'

scroll('#root')
```

When you use `scroll-behavior` equals `smooth` you can get callback when the scrolling finished.
```javascript
scroll(0, () => console.log('scrolling is finished'))
```

More details [here](https://github.com/d8corp/web-scroll)

## Issues

If you find a bug, please file an issue on [GitHub](https://github.com/d8corp/watch-state-history-api/issues)

[![issues](https://img.shields.io/github/issues-raw/d8corp/watch-state-history-api)](https://github.com/d8corp/watch-state-history-api/issues)

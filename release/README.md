<br>
<p align="center">
  <a href="https://www.npmjs.com/package/watch-state">
    <img width="200" height="200" src="https://raw.githubusercontent.com/d8corp/watch-state/v3.3.3/img/logo.svg" alt="Watch-State logo by Mikhail Lysikov">
  </a>
</p>

<h1 align="center">@watch-state/history-api</h1>

<p align="center">Browser History API with <a href="https://www.npmjs.com/package/watch-state" target="_blank">watch-state</a></p>

<br>

<div align="center">
  <a href="https://www.npmjs.com/package/@watch-state/history-api" target="_blank">
    <img src="https://img.shields.io/npm/v/@watch-state/history-api.svg" alt="@watch-state/history-api npm">
  </a>
  <a href="https://github.com/d8corp/watch-state-history-api" target="_blank">
    <img src="https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white" alt="@watch-state/history-api source code">
  </a>
  <a href="https://www.npmtrends.com/@watch-state/history-api" target="_blank">
    <img src="https://img.shields.io/npm/dm/@watch-state/history-api.svg" alt="@watch-state/history-api downloads">
  </a>
  <a href="https://github.com/d8corp/watch-state-history-api/tree/main/release" target="_blank">
    <img src="https://packagephobia.com/badge?p=@watch-state/history-api" alt="@watch-state/history-api install size">
  </a>
  <a href="https://www.typescriptlang.org" target="_blank">
    <img src="https://img.shields.io/npm/types/@watch-state/history-api" alt="TypeScript">
  </a>
  <a href="https://github.com/d8corp/watch-state-history-api/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/npm/l/@watch-state/history-api" alt="@watch-state/history-api license">
  </a>
  <a href="https://github.com/d8corp/watch-state-history-api/blob/main/CHANGELOG.md" target="_blank">
    <img src="https://img.shields.io/badge/Changelog-⋮-brightgreen" alt="@watch-state/history-api changelog">
  </a>
  <a href="https://github.com/d8corp/watch-state-history-api/issues" target="_blank">
    <img src="https://img.shields.io/github/issues-raw/d8corp/watch-state-history-api" alt="Open issues">
  </a>
  <a href="https://github.com/d8corp/watch-state-history-api/pulls" target="_blank">
    <img src="https://img.shields.io/github/issues-pr-raw/d8corp/watch-state-history-api" alt="Pull requests">
  </a>
</div>

<br>

## Install

npm
```bash
npm i @watch-state/history-api
```

yarn
```bash
yarn add @watch-state/history-api
```

## Usage

You can change History API by `historyPush` and `historyReplace` from this library
or use some default History API methods:
`history.back()`, `history.forward()`, `history.go(delta)`

### historyPush

This is an action to add History API step. Use the action instead of `history.pushState`.

```typescript
import { historyPush } from '@watch-state/history-api'

historyPush('/new-url')
```

This action returns a promise because of History API changes non-immediately with `historyPush`.
It first of all scrolls to page up by default.

```typescript
historyPush('/new-url').then(() => {
  console.log('done')
})
```

Use `scroll-behavior` equals `smooth` to have a smooth scroll effect.

You can scroll to another position by the second argument.

```typescript
historyPush('/new-url', 100)
```

You can use a selector to scroll at an element.

```typescript
historyPush('/new-url', '#header')
```

### historyReplace

This is an action to replace History API step. Use the action instead of `history.replaceState`.

```typescript
import { historyReplace } from '@watch-state/history-api'

historyReplace('/new-url')
```

It works the same as `historyPush` so it returns a promise and has 2 arguments.

---

You can react on History API changes by next store elements:

---

### locationHref

Returns observable `location.href`

```javascript
import { Watch } from 'watch-state'
import { locationHref, historyPush } from '@watch-state/history-api'

new Watch(() => {
  console.log(locationHref.value)
})

historyPush('/test')
```

### locationURL

Returns observable `location.pathname + location.search + location.hash`

```javascript
import { Watch } from 'watch-state'
import { locationURL, historyPush } from '@watch-state/history-api'

new Watch(() => {
  console.log(locationURL.value)
})

historyPush('/test')
```

### locationPath

Returns observable `location.pathname`

```javascript
import { Watch } from 'watch-state'
import { locationPath, historyPush } from '@watch-state/history-api'

new Watch(() => {
  console.log(locationPath.value)
})

historyPush('/test')
```

### locationSearch

Returns observable `location.search`

```javascript
import { Watch } from 'watch-state'
import { locationSearch, historyPush } from '@watch-state/history-api'

new Watch(() => {
  console.log(locationSearch.value)
})

historyPush('?test=1')
```

### locationHash

Returns observable `location.hash`

```javascript
import { Watch } from 'watch-state'
import { locationHash, historyPush } from '@watch-state/history-api'

new Watch(() => {
  console.log(locationHash.value)
})

historyPush('#hash')
```

### historyMovement

This is a `Cache` returns one of the next string: `back` | `forward` | `same`.

If you go back by browser button or `history.back()` or `history.go(delta)` with a negative `delta` then `historyMovement` value equals `back`.

If you go forward by browser button or `history.forward()` or `history.go(delta)` with a positive `delta` or `historyPush` then `historyMovement` value equals `forward`.

If you use `historyReplace`, `historyMovement` value equals `same`

```javascript
import { Watch } from 'watch-state'
import { historyMovement, historyPush } from '@watch-state/history-api'

new Watch(() => {
  console.log(historyMovement.value)
})

historyPush('/test')
history.back()
history.forward()
```

### historyState

Returns observable `history.state`

```javascript
import { Watch } from 'watch-state'
import { historyState, historyPush } from '@watch-state/history-api'

new Watch(() => {
  console.log(historyState.value)
})

historyPush('/test')
```

## Issues

If you find a bug, please file an issue on [GitHub](https://github.com/d8corp/watch-state-history-api/issues)

[![issues](https://img.shields.io/github/issues-raw/d8corp/watch-state-history-api)](https://github.com/d8corp/watch-state-history-api/issues)

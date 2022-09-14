import { __decorate } from 'tslib';
import { Cache } from 'watch-state';
import { state, event, cache } from '@watch-state/decorators';
import scroll__default from 'web-scroll';
import { version } from '../package.es6.js';

class History {
    constructor(locales = '', key = 'history-api ' + version) {
        this._url = location.pathname + location.search + location.hash;
        this.locales = locales;
        this.key = key;
        this.defaultState = {
            key,
            steps: []
        };
        const { state } = window.history;
        if ((state === null || state === void 0 ? void 0 : state.key) === key) {
            this.state = state;
        }
        else {
            this.state = this.defaultState;
        }
        const listener = ({ state }) => this.onChange(state);
        window.addEventListener('popstate', listener);
        this.destructor = () => window.removeEventListener('popstate', listener);
    }
    onChange(state) {
        const { pathname, search, hash } = location;
        const oldState = this.state;
        this.state = state && this.key === state.key ? state : this.defaultState;
        this._url = pathname + search + hash;
        if (!state || this.key !== state.key || (oldState && this.key === oldState.key && oldState.steps.length > state.steps.length)) {
            this.movement = 'back';
            scroll__default({
                position: oldState.steps[oldState.steps.length - 1].position,
                attempts: 3,
            });
        }
        else {
            this.movement = 'forward';
        }
    }
    get locale() {
        const { locales } = this;
        if (locales) {
            const match = this._url.match(new RegExp(`^/(${locales})(/|\\?|#|$)`));
            return match ? match[1] : '';
        }
        return '';
    }
    set locale(locale) {
        const { locales, locale: currentLocale } = this;
        if (locales && locale !== currentLocale && (!locale || new RegExp(`^(${locales})$`).test(locale))) {
            const { url, state: { steps } } = this;
            const position = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            this.changeState(newUrl => {
                window.history.pushState({
                    key: this.key,
                    steps: [...steps, {
                            url,
                            position
                        }]
                }, null, newUrl);
                this.onChange(window.history.state);
            }, locale, url, -1);
        }
    }
    get localUrl() {
        return this._url;
    }
    get url() {
        const { locales, _url } = this;
        return locales ? _url.replace(new RegExp(`^/(${locales})((/)|(\\?|#|$))`), '/$4') : _url;
    }
    get path() {
        return this.url.replace(/[?#].*/, '');
    }
    get hash() {
        const math = this.url.match(/^[^#]*#(.+)/);
        return math ? math[1] : '';
    }
    get href() {
        return this.url.replace(/#.*/, '');
    }
    get search() {
        const math = this.url.match(/^[^#?]*\?([^#]+)/);
        return math ? math[1] : '';
    }
    getSearch(key) {
        return this.get(`^[^?#]*\\?([^#]*\\&)*${key}=([^#&]*)`, 2);
    }
    back(is, def = '/', scrollFirst = false) {
        if (is) {
            if (typeof is !== 'function') {
                const regexp = is;
                is = url => regexp.test(url);
            }
            const { steps } = this.state;
            for (let i = steps.length - 1; i > -1; i--) {
                const step = steps[i];
                if (is(step.url)) {
                    return this.push(step.url, step.position, scrollFirst);
                }
            }
            this.push(def, 0, scrollFirst);
        }
        else if (scrollFirst) {
            const { steps } = this.state;
            scroll__default(steps[steps.length - 1].position, () => window.history.back());
        }
        else {
            window.history.back();
        }
        return this;
    }
    forward() {
        window.history.forward();
        return this;
    }
    go(delta) {
        window.history.go(delta);
        return this;
    }
    replace(url, position = 0, scrollFirst = false) {
        this.changeState(newUrl => {
            window.history.replaceState(this.state, null, newUrl);
        }, this.locale, url, position, scrollFirst);
        this.onChange(window.history.state);
        return this;
    }
    push(url, position = 0, scrollFirst = false) {
        const { url: currentUrl, state: { steps } } = this;
        const top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.changeState(newUrl => {
            if (currentUrl !== url) {
                window.history.pushState({
                    key: this.key,
                    steps: [...steps, {
                            url: currentUrl,
                            position: top
                        }]
                }, null, newUrl);
                this.onChange(window.history.state);
            }
        }, this.locale, url, position, scrollFirst);
        return this;
    }
    is(reg) {
        if (!this.isCache) {
            this.isCache = {};
        }
        if (!this.isCache[reg]) {
            const regExp = new RegExp(reg);
            this.isCache[reg] = new Cache(() => regExp.test(this.url), true);
        }
        return this.isCache[reg].value;
    }
    get(reg, index = 0, defaultValue = '') {
        if (!this.getCache) {
            this.getCache = {};
        }
        if (!this.getCache[index]) {
            this.getCache[index] = {};
        }
        if (!this.getCache[index][reg]) {
            const regExp = new RegExp(reg);
            this.getCache[index][reg] = new Cache(() => {
                const result = regExp.exec(this.url);
                return result ? result[index] || '' : defaultValue;
            }, true);
        }
        return this.getCache[index][reg].value;
    }
    changeState(callback, locale, url, position, scrollFirst) {
        const mainCallback = () => {
            if (locale) {
                const match = url.match(/^([^?#]*)(.*)/);
                callback(match[1] === '/' ? `/${locale}${match[2]}` : `/${locale}${url}`);
            }
            else {
                callback(url);
            }
        };
        if (scrollFirst) {
            scroll__default(position, mainCallback);
        }
        else {
            mainCallback();
            scroll__default(position);
        }
    }
}
__decorate([
    state
], History.prototype, "movement", void 0);
__decorate([
    state
], History.prototype, "state", void 0);
__decorate([
    state
], History.prototype, "locales", void 0);
__decorate([
    state
], History.prototype, "_url", void 0);
__decorate([
    event
], History.prototype, "onChange", null);
__decorate([
    cache
], History.prototype, "locale", null);
__decorate([
    cache
], History.prototype, "url", null);
__decorate([
    cache
], History.prototype, "path", null);
__decorate([
    cache
], History.prototype, "hash", null);
__decorate([
    cache
], History.prototype, "href", null);
__decorate([
    cache
], History.prototype, "search", null);

export default History;
export { History };

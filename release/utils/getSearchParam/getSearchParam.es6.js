import { Cache } from 'watch-state';
import '../../store/index.es6.js';
import { urlSearchParams } from '../../store/urlSearchParams/urlSearchParams.es6.js';

var cache = Object.create(null);
function getSearchParam(key) {
    if (key in cache)
        return cache[key];
    return (cache[key] = new Cache(function () { return urlSearchParams.value.get(key) || ''; }));
}

export { getSearchParam };

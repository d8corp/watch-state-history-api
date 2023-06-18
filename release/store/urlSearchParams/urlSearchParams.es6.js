import { Cache } from 'watch-state';
import '../locationSearch/index.es6.js';
import { locationSearch } from '../locationSearch/locationSearch.es6.js';

var urlSearchParams = new Cache(function () { return new URLSearchParams(locationSearch.value); });

export { urlSearchParams };

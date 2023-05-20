import { Cache } from 'watch-state';
import '../historyState/index.es6.js';
import { historyState } from '../historyState/historyState.es6.js';

var locationSearch = new Cache(function () { return historyState.value && window.location.search; });

export { locationSearch };

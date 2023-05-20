import { Cache } from 'watch-state';
import '../historyState/index.es6.js';
import { historyState } from '../historyState/historyState.es6.js';

var locationPath = new Cache(function () { return historyState.value && window.location.pathname; });

export { locationPath };

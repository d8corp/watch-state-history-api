import { Cache } from 'watch-state';
import '../historyState/index.es6.js';
import { historyState } from '../historyState/historyState.es6.js';

var locationURL = new Cache(function () { return historyState.value && "".concat(window.location.pathname).concat(window.location.search).concat(window.location.hash); });

export { locationURL };

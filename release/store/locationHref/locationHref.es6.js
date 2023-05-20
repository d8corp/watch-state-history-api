import { Cache } from 'watch-state';
import '../historyState/index.es6.js';
import { historyState } from '../historyState/historyState.es6.js';

var locationHref = new Cache(function () { return historyState.value && window.location.href; });

export { locationHref };

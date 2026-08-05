import { Compute } from 'watch-state';
import '../historyState/index.es6.js';
import { historyState } from '../historyState/historyState.es6.js';

var locationHash = new Compute(function () { return historyState.value && window.location.hash; });

export { locationHash };

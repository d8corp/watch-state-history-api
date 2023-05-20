import { Cache } from 'watch-state';
import '../historyState/index.es6.js';
import { historyState } from '../historyState/historyState.es6.js';

var _lastLength = 0;
var historyMovement = new Cache(function () {
    var currentLength = historyState.value.steps.length;
    var lastLength = _lastLength;
    _lastLength = currentLength;
    if (currentLength > lastLength)
        return 'forward';
    if (currentLength < lastLength)
        return 'back';
    return 'same';
});

export { historyMovement };

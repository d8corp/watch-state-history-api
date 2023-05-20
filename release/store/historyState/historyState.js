'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');

var historyState = new watchState.State(getHistoryStateRaw());
function getHistoryStateRaw() {
    var _a;
    return (_a = window.history.state) !== null && _a !== void 0 ? _a : {
        steps: [],
    };
}
function updateHistoryState() {
    historyState.value = getHistoryStateRaw();
}
window.addEventListener('popstate', updateHistoryState);

exports.getHistoryStateRaw = getHistoryStateRaw;
exports.historyState = historyState;
exports.updateHistoryState = updateHistoryState;

import { State } from 'watch-state';

var historyState = new State(getHistoryStateRaw());
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

export { getHistoryStateRaw, historyState, updateHistoryState };

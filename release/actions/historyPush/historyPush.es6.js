import { __spreadArray, __read } from 'tslib';
import scroll from 'web-scroll';
import '../../store/historyState/index.es6.js';
import { updateHistoryState } from '../../store/historyState/historyState.es6.js';

function historyPush(url, position) {
    if (position === void 0) { position = 0; }
    var sameUrl = url === "".concat(window.location.pathname).concat(window.location.search).concat(window.location.hash);
    return new Promise(function (resolve) {
        scroll(position, function () {
            var _a;
            if (!sameUrl) {
                var top_1 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.history.pushState({
                    steps: __spreadArray(__spreadArray([], __read((((_a = window.history.state) === null || _a === void 0 ? void 0 : _a.steps) || [])), false), [{
                            url: url,
                            position: top_1,
                        }], false),
                }, '', url);
                updateHistoryState();
            }
            resolve(undefined);
        });
    });
}

export { historyPush };

import { __spreadArray, __read } from 'tslib';
import scroll from 'web-scroll';
import '../../store/historyState/index.es6.js';
import { updateHistoryState } from '../../store/historyState/historyState.es6.js';

function historyReplace(url, position) {
    if (position === void 0) { position = 0; }
    var sameUrl = url === window.location.href;
    return new Promise(function (resolve) {
        scroll(position, function () {
            var _a, _b;
            if (!sameUrl) {
                var top_1 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.history.replaceState({
                    steps: __spreadArray(__spreadArray([], __read((_b = (_a = window.history.state) === null || _a === void 0 ? void 0 : _a.steps) === null || _b === void 0 ? void 0 : _b.slice(0, -1)), false), [{
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

export { historyReplace };

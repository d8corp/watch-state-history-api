'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var scroll = require('web-scroll');
require('../../store/historyState/index.js');
var historyState = require('../../store/historyState/historyState.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var scroll__default = /*#__PURE__*/_interopDefaultLegacy(scroll);

function historyReplace(url, position) {
    if (position === void 0) { position = 0; }
    var sameUrl = url === window.location.href;
    return new Promise(function (resolve) {
        scroll__default["default"](position, function () {
            var _a, _b;
            if (!sameUrl) {
                var top_1 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.history.replaceState({
                    steps: tslib.__spreadArray(tslib.__spreadArray([], tslib.__read((_b = (_a = window.history.state) === null || _a === void 0 ? void 0 : _a.steps) === null || _b === void 0 ? void 0 : _b.slice(0, -1)), false), [{
                            url: url,
                            position: top_1,
                        }], false),
                }, '', url);
                historyState.updateHistoryState();
            }
            resolve(undefined);
        });
    });
}

exports.historyReplace = historyReplace;

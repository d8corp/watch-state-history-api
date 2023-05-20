'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var scroll = require('web-scroll');
require('../../store/historyState/index.js');
var historyState = require('../../store/historyState/historyState.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var scroll__default = /*#__PURE__*/_interopDefaultLegacy(scroll);

function historyPush(url, position) {
    if (position === void 0) { position = 0; }
    var sameUrl = url === "".concat(window.location.pathname).concat(window.location.search).concat(window.location.hash);
    return new Promise(function (resolve) {
        scroll__default["default"](position, function () {
            var _a;
            if (!sameUrl) {
                var top_1 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.history.pushState({
                    steps: tslib.__spreadArray(tslib.__spreadArray([], tslib.__read((((_a = window.history.state) === null || _a === void 0 ? void 0 : _a.steps) || [])), false), [{
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

exports.historyPush = historyPush;

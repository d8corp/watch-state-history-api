'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');
require('../historyState/index.js');
var historyState = require('../historyState/historyState.js');

var locationURL = new watchState.Cache(function () { return historyState.historyState.value && "".concat(window.location.pathname).concat(window.location.search).concat(window.location.hash); });

exports.locationURL = locationURL;

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');
require('../historyState/index.js');
var historyState = require('../historyState/historyState.js');

var locationSearch = new watchState.Cache(function () { return historyState.historyState.value && window.location.search; });

exports.locationSearch = locationSearch;

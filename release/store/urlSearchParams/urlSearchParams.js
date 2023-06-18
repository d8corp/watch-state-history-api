'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');
require('../locationSearch/index.js');
var locationSearch = require('../locationSearch/locationSearch.js');

var urlSearchParams = new watchState.Cache(function () { return new URLSearchParams(locationSearch.locationSearch.value); });

exports.urlSearchParams = urlSearchParams;

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');
require('../../store/index.js');
var urlSearchParams = require('../../store/urlSearchParams/urlSearchParams.js');

var cache = Object.create(null);
function getSearchParam(key) {
    if (key in cache)
        return cache[key];
    return (cache[key] = new watchState.Cache(function () { return urlSearchParams.urlSearchParams.value.get(key) || ''; }));
}

exports.getSearchParam = getSearchParam;

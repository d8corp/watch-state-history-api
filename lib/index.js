'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var decode = require('./decode.js');
var parseUrl = require('./parseUrl.js');
var setSearch = require('./setSearch.js');
require('tslib');
require('watch-state');
var scroll = require('web-scroll');
var history = require('./history.js');



Object.keys(scroll).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return scroll[k];
    }
  });
});
exports.decode = decode;
exports.ParseUrlReg = parseUrl.ParseUrlReg;
exports.parseUrl = parseUrl['default'];
exports.setSearch = setSearch;
exports.default = history;

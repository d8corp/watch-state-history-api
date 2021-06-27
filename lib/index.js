'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var decode = require('./decode.js');
var parseUrl = require('./parseUrl.js');
var setSearch = require('./setSearch.js');
var history = require('./history.js');
var scroll = require('web-scroll');
require('tslib');
require('watch-state');
require('@watch-state/decorators');



exports.decode = decode;
exports.ParseUrlReg = parseUrl.ParseUrlReg;
exports.parseUrl = parseUrl['default'];
exports.setSearch = setSearch;
exports.History = history.History;
exports.default = history.History;
Object.keys(scroll).forEach(function (k) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return scroll[k];
    }
  });
});

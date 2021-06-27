'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var decode = require('./decode/decode.js');
var parseUrl = require('./parseUrl/parseUrl.js');
var setSearch = require('./setSearch/setSearch.js');
var history = require('./history/history.js');
var scroll = require('web-scroll');



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

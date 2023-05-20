'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');
require('../historyState/index.js');
var historyState = require('../historyState/historyState.js');

var _lastLength = 0;
var historyMovement = new watchState.Cache(function () {
    var currentLength = historyState.historyState.value.steps.length;
    var lastLength = _lastLength;
    _lastLength = currentLength;
    if (currentLength > lastLength)
        return 'forward';
    if (currentLength < lastLength)
        return 'back';
    return 'same';
});

exports.historyMovement = historyMovement;

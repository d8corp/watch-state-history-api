'use strict';

var parseUrl = require('../parseUrl/parseUrl.js');

function setSearch(url, key, value) {
    if (typeof key === 'object') {
        for (var param in key) {
            url = setSearch(url, param, key[param]);
        }
        return url;
    }
    if (value === undefined) {
        var _a = parseUrl['default'](url), _b = _a.path, path_1 = _b === void 0 ? '' : _b, _c = _a.search, search_1 = _c === void 0 ? '' : _c, _d = _a.hash, hash_1 = _d === void 0 ? '' : _d;
        var newSearch_1 = search_1.replace(new RegExp("(^|&)" + key + "(=[^&]*)?(&|$)"), '&').replace(/(^&|&$)/, '');
        return path_1 + (newSearch_1 ? '?' + newSearch_1 : '') + (hash_1 ? '#' + hash_1 : '');
    }
    var _e = parseUrl['default'](url), _f = _e.path, path = _f === void 0 ? '' : _f, _g = _e.search, search = _g === void 0 ? '' : _g, _h = _e.hash, hash = _h === void 0 ? '' : _h;
    var newSearch = '';
    var containsKey = new RegExp("(^|&)" + key + "(=|&|$)").test(search);
    var postKey = value ? "=" + value : '';
    if (containsKey) {
        newSearch = search.replace(new RegExp("(^|&)" + key + "(=|=[^&]*)?(&|$)"), "$1" + key + postKey + "$3");
    }
    else {
        newSearch = "" + (search ? search + '&' : '') + key + postKey;
    }
    return path + (newSearch ? '?' + newSearch : '') + (hash ? '#' + hash : '');
}

module.exports = setSearch;

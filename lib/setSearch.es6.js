import parseUrl from './parseUrl.es6.js';

function setSearch(url, key, value) {
    if (typeof key === 'object') {
        for (const param in key) {
            url = setSearch(url, param, key[param]);
        }
        return url;
    }
    if (value === undefined) {
        const { path = '', search = '', hash = '' } = parseUrl(url);
        const newSearch = search.replace(new RegExp(`(^|&)${key}(=[^&]*)?(&|$)`), '&').replace(/(^&|&$)/, '');
        return path + (newSearch ? '?' + newSearch : '') + (hash ? '#' + hash : '');
    }
    const { path = '', search = '', hash = '' } = parseUrl(url);
    let newSearch = '';
    const containsKey = new RegExp(`(^|&)${key}(=|&|$)`).test(search);
    const postKey = value ? `=${value}` : '';
    if (containsKey) {
        newSearch = search.replace(new RegExp(`(^|&)${key}(=|=[^&]*)?(&|$)`), `$1${key}${postKey}$3`);
    }
    else {
        newSearch = `${search ? search + '&' : ''}${key}${postKey}`;
    }
    return path + (newSearch ? '?' + newSearch : '') + (hash ? '#' + hash : '');
}

export default setSearch;

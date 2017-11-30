import {Model} from 'ringa';

const DEFAULT_TIMEOUT = 10000;

export default class APIModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor() {
    super();

    this.addProperty('calls', 0);
    this.addProperty('noInternet', false);
    this.addProperty('activeCalls', 0);
    this.addProperty('errors', []);

    this.cache = {};
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  genCacheKey(url, key = '') {
    return url + key;
  }

  getCacheFor(url, key = '') {
    let cacheItem = this.cache[this.genCacheKey(url, key)];

    if (cacheItem) {
      let now = new Date().getTime();

      if (cacheItem.timeout < now) {
        return undefined;
      }
    }

    return cacheItem;
  }

  startCacheRequest(url, timeout = DEFAULT_TIMEOUT, key = '') {
    this.cache[this.genCacheKey(url, key)] = {
      url,
      key,
      watchers: [],
      timeout: new Date().getTime() + timeout
    };
  }

  finishCacheRequest(url, response, key = '') {
    let cacheItem = this.cache[this.genCacheKey(url + key)];

    cacheItem.response = response;

    let w = cacheItem.watchers;

    if (w) {
      w.forEach(f => f(cacheItem));
    }
  }
}

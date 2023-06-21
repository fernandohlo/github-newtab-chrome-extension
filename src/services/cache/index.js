const TTL = 180; // 3min
const PREFIX = 'cache-gtn-'
const cacheProvider = _getCacheProvider();

export async function setCache(key, value) {
  const keyValue = {};
  keyValue[PREFIX + key] = value;
  await cacheProvider.set(keyValue);

  const keyValueDated = {};
  keyValueDated[`${PREFIX}updated-${key}`] = Date.now();
  await cacheProvider.set(keyValueDated);
}

export async function clearAll () {
  Object.entries(localStorage).map(
    x => x[0]
  ).filter(
    x => x.substring(0,10) == PREFIX
  ).map(
    x => localStorage.removeItem(x)
  );
}
  
export async function getCache(key) {
  return await cacheProvider.get(PREFIX + key);
}

export async function availableInCache(key) {
  const lastUpdated = await getCache(`${PREFIX}updated-${key}`);
  const diffTime = Math.abs(lastUpdated - Date.now()) / 1000;

  if (lastUpdated && diffTime < TTL) {
    const dataFromCache = await getCache(key);
    if (dataFromCache) {
      return dataFromCache;
    }
  }

  return false;
}

function _getCacheProvider () {
  if (chrome && chrome.storage && chrome.storage.local) {
    return {
      get: async (param) => {
        const result = await chrome.storage.local.get([param])
        return result[param];
      },
      set: async (param) => await chrome.storage.local.set(param)
    }
  }

  return {
    get: async (param) => {
      const value = await localStorage.getItem(param);
      return JSON.parse(value)
    },
    set: async (param) => {
      const key = Object.keys(param)[0];
      const value = JSON.stringify(param[key]);
      return await localStorage.setItem(key, value);
    }
  }
}

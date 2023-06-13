const TTL = 180; // 3min
const cacheProvider = _getCacheProvider();

export async function setCache(key, value) {
  const keyValue = {};
  keyValue[key] = value;
  await cacheProvider.set(keyValue);

  const keyValueDated = {};
  keyValueDated[`updated-${key}`] = Date.now();
  await cacheProvider.set(keyValueDated);
}
  
export async function getCache(key) {
  return await cacheProvider.get(key);
}

  
export async function availableInCache(key) {
  const lastUpdated = await getCache(`updated-${key}`);
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
    get: async (param) => await localStorage.getItem(param),
    set: async (param) => await localStorage.setItem(param[0], param[1])
  }
}

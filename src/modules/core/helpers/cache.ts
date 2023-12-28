/* eslint-disable no-undef */
const TTL = 180; // 3min
const PREFIX = 'cache-gtn-';
const cacheProvider = _getCacheProvider();

export async function setCache (key: string, value: string) {
  const keyValue: any = {};
  keyValue[PREFIX + key] = value;
  await cacheProvider.set(keyValue);

  const keyValueDated: any = {};
  keyValueDated[`${PREFIX}updated-${key}`] = Date.now();
  await cacheProvider.set(keyValueDated);
}

export async function clearAll () {
  Object.entries(localStorage).map(
    x => x[0]
  ).filter(
    x => x.substring(0, 10) === PREFIX
  ).map(
    x => localStorage.removeItem(x)
  );
}

export async function getCache (key: string) {
  return await cacheProvider.get(PREFIX + key);
}

export async function availableInCache (key: string) {
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
      get: async (param: string) => {
        const result = await chrome.storage.local.get([param]);
        return result[param];
      },
      set: async (param: any) => await chrome.storage.local.set(param)
    };
  }

  return {
    get: async (param: string) => {
      const value: any = await localStorage.getItem(param);
      return JSON.parse(value);
    },
    set: async (param: any) => {
      const key: string = Object.keys(param)[0];
      const value: any = JSON.stringify(param[key]);
      return await localStorage.setItem(key, value);
    }
  };
}

import { getHeaders } from './headers.js';
import { setCache, availableInCache } from '../cache/index.js';

export async function rest (url, cacheKey) {
  const dataFromCache = await availableInCache(cacheKey);
  if (dataFromCache) {
    return dataFromCache;
  }

  const requestOptions = {
    method: 'GET',
    headers: getHeaders(),
    redirect: 'follow'
  };
  const response = await fetch(url, requestOptions)
  const result = await response.json();

  await setCache(cacheKey, result);

  return result;
}

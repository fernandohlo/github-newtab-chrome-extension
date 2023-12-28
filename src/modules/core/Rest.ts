import { injectable } from 'inversify';
import { getHeaders } from './helpers/headers';
import { setCache, availableInCache } from './helpers/cache';

@injectable()
export default class Rest {
  async execute ({ url = '', cacheKey = '', options = {} }: any) {
    const dataFromCache = await availableInCache(cacheKey);
    if (dataFromCache) {
      return dataFromCache;
    }

    const requestOptions: any = {
      method: 'GET',
      headers: getHeaders(),
      redirect: 'follow',
      ...options
    };
    const response = await fetch(url, requestOptions);
    let result;
    try {
      result = await response.json();
    } catch (e) {
      console.error(e);
    }

    if (result) {
      await setCache(cacheKey, result);
    }

    return result;
  }
}

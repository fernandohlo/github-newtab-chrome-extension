import { injectable } from 'inversify';
import { getHeaders } from './helpers/headers';
import { setCache, availableInCache } from './helpers/cache';

@injectable()
export default class Rest {
  async execute ({ url = '', cacheKey = '' }: any) {
    const dataFromCache = await availableInCache(cacheKey);
    if (dataFromCache) {
      return dataFromCache;
    }

    const requestOptions: any = {
      method: 'GET',
      headers: getHeaders(),
      redirect: 'follow'
    };
    const response = await fetch(url, requestOptions);
    const result = await response.json();

    await setCache(cacheKey, result);

    return result;
  }
}

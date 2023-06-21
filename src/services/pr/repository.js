import { getPRsOpen, getPRReviewInfo, getPRsByUserReviewRequested, getPRInfo } from './provider.js';
import { filterByLabel, filterByUser } from './filter.js';

export async function listPRs () {
  const items = await getPRsOpen();

  for (const item of items) {
    item.reviewsInfo = await getPRReviewInfo(item.number);
    item.prInfo = await getPRInfo(item.number);
  };

  return items;
}

export async function listPRsSquad (filter) {
  const result = await getPRsOpen();
  const items = filterByLabel(result, filter);

  for (const item of items) {
    item.reviewsInfo = await getPRReviewInfo(item.number);
    item.prInfo = await getPRInfo(item.number);
  };

  return items;
}

export async function listPRsInternal (filter) {
  const result = await getPRsOpen();
  const items = filterByLabel(result, filter);

  for (const item of items) {
    item.reviewsInfo = await getPRReviewInfo(item.number);
    item.prInfo = await getPRInfo(item.number);
  };

  return items;
}

export async function listPRsUser (filter) {

  const result = await getPRsOpen();
  const items = filterByUser(result, filter);

  for (const item of items) {
    item.reviewsInfo = await getPRReviewInfo(item.number);
    item.prInfo = await getPRInfo(item.number);
  };

  return items;
}

export async function listPRsReviewRequested () {
  const result = await getPRsByUserReviewRequested();

  for (const item of result.items) {
    item.reviewsInfo = await getPRReviewInfo(item.number);
    item.prInfo = await getPRInfo(item.number);
  };

  return result.items;
}

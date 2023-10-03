import { getPRsOpen, getPRReviewInfo, getPRInfo } from './provider.js';

export async function listPRs () {
  const items = await getPRsOpen();

  for (const item of items) {
    item.reviewsInfo = [];
    item.prInfo = {};
  }

  return items;
}

export async function getPRReview (number) {
  const items = await getPRReviewInfo(number);
  return items;
}

export async function getPR (number) {
  const info = await getPRInfo(number);
  return info;
}

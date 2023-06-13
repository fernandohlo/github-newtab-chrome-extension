import { getPRsOpen, getPRReviewInfo, getPRsByUserReviewRequested, getPRInfo } from './repository.js';
import { filterByLabel, filterByUser } from './filter.js';
import { prs } from '../ui/pr.js';
import { block } from '../ui/block.js';
import { ID_APP } from '../constants/index.js';

const GITHUB_LABEL = localStorage.getItem('GITHUB_LABEL');
const GITHUB_LABEL_IMPORTANT = localStorage.getItem('GITHUB_LABEL_IMPORTANT');

async function listPRsSquad() {
  const result = await getPRsOpen();
  const items = filterByLabel(result, GITHUB_LABEL);

  for (const item of items) {
    item.reviewsInfo = await getPRReviewInfo(item.number);
    item.prInfo = await getPRInfo(item.number);
  };

  const uiPRs = prs(items);
  const uiBlock = block('data_by_squad', `${GITHUB_LABEL}`, items.length, uiPRs, 'w100');

  document.getElementById(ID_APP).innerHTML += uiBlock;
}

async function listPRsInternal() {
  const result = await getPRsOpen();
  const items = filterByLabel(result, GITHUB_LABEL_IMPORTANT);

  for (const item of items) {
    item.reviewsInfo = await getPRReviewInfo(item.number);
    item.prInfo = await getPRInfo(item.number);
  };

  const uiPRs = prs(items);
  const uiBlock = block('data_by_label', `${GITHUB_LABEL_IMPORTANT}`, items.length, uiPRs, 'w100');

  document.getElementById(ID_APP).innerHTML += uiBlock;
}

async function listPRsUser() {
  const GITHUB_USER = localStorage.getItem('GITHUB_USER');

  const result = await getPRsOpen();
  const items = filterByUser(result, GITHUB_USER);

  for (const item of items) {
    item.reviewsInfo = await getPRReviewInfo(item.number);
    item.prInfo = await getPRInfo(item.number);
  };

  const uiPRs = prs(items);
  const uiBlock = block('data_by_user', `${GITHUB_USER}`, items.length, uiPRs);

  document.getElementById(ID_APP).innerHTML += uiBlock;
}

async function listPRsReviewRequested() {
  const result = await getPRsByUserReviewRequested();

  for (const item of result.items) {
    item.reviewsInfo = await getPRReviewInfo(item.number);
    item.prInfo = await getPRInfo(item.number);
  };

  const uiPRs = prs(result.items);
  const uiBlock = block('data_me', `@me`, result.items.length, uiPRs);

  document.getElementById(ID_APP).innerHTML += uiBlock;
}

export async function getPrs() {
  document.getElementById(ID_APP).innerHTML = '';

  await listPRsUser();
  await listPRsReviewRequested();
  if (GITHUB_LABEL) {
    await listPRsSquad();
  }
  if (GITHUB_LABEL_IMPORTANT) {
    await listPRsInternal();
  }
}

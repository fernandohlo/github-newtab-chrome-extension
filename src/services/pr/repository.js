import { rest } from '../fetch/rest.js';
import { setCache, availableInCache } from '../cache/index.js';

export function getPRsByLabel(label) {
  const cacheKey = `prs-${label}`;
  return rest(`https://api.github.com/search/issues?q=repo:inditex/web-ecommercebershkafrontnodejs+is:open+is:pr+label:${label}`, cacheKey);
}

export function getPRsByUserAssignee(user) {
  const cacheKey = `prs-u-${user}`;
  return rest(`https://api.github.com/search/issues?q=repo:inditex/web-ecommercebershkafrontnodejs+is:open+is:pr+assignee:${user}`, cacheKey);
}

export function getPRsByUserReviewRequested() {
  const cacheKey = `prs-me`;
  return rest(`https://api.github.com/search/issues?q=repo:inditex/web-ecommercebershkafrontnodejs+is:open+is:pr+user-review-requested:@me`, cacheKey);
}

export function getPRsOpen() {
  const cacheKey = `prs`;
  return rest(`https://api.github.com/repos/inditex/web-ecommercebershkafrontnodejs/pulls?state=open&per_page=150`, cacheKey);
}

export async function getPRReviewInfo(number) {
  const cacheKey = `pr-reviews-${number}`;
  let result = await rest(`https://api.github.com/repos/inditex/web-ecommercebershkafrontnodejs/pulls/${number}/reviews`, cacheKey);

  if (result && Array.isArray(result)) {
    const reversed = result.reverse();
    const users = {};
    result = reversed.filter((review) => {
      if (users[review.user.login]) {
        return false;
      } else {
        users[review.user.login] = true;
        return true;
      }
    });
  }

  return result;
}

export function getPRInfo(number) {
  const cacheKey = `pr-${number}`;
  return rest(`https://api.github.com/repos/inditex/web-ecommercebershkafrontnodejs/pulls/${number}`, cacheKey);
}

import { injectable } from 'inversify';
import GithubProvider from '@/modules/github/providers/GithubProvider';

@injectable()
export default class PRsProvider extends GithubProvider {
  static get CACHE_KEY () {
    return 'prs';
  }

  async getPRs (): Promise<any> {
    const items = await this.execute(GithubProvider.PRS_URL, PRsProvider.CACHE_KEY);

    for (const item of items) {
      item.reviewsInfo = [];
      item.prInfo = {};
    }

    return items;
  }

  async getPRReview (number: string) {
    let result = await this.execute(GithubProvider.PRS_REVIEWS_URL(number), `${PRsProvider.CACHE_KEY}-reviews-${number}`);

    if (result && Array.isArray(result)) {
      const reversed = result.reverse();
      const users: any = {};
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

  async getPR (number: string) {
    return this.execute(GithubProvider.PR_URL(number), `${PRsProvider.CACHE_KEY}-${number}`);
  }
}

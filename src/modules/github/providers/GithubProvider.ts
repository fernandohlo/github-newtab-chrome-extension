import { injectable, inject } from 'inversify';
import Rest from '@/modules/core/Rest';

@injectable()
export default class GithubProvider {
  private _restClient: Rest;

  static get GITHUB_REPO () {
    return localStorage.getItem('GITHUB_REPO');
  }

  static get GITHUB_URL () {
    return `https://api.github.com/repos/${GithubProvider.GITHUB_REPO}/`;
  }

  static get PRS_URL () {
    return 'pulls?state=open&per_page=150';
  }

  static PRS_REVIEWS_URL (number: string) {
    return `pulls/${number}/reviews`;
  }

  static PR_URL (number: string) {
    return `pulls/${number}`;
  }

  constructor (@inject(Rest) rest: Rest) {
    this._restClient = rest;
  }

  async execute (url: string, cacheKey: string): Promise<any> {
    const response = await this._restClient?.execute({ url: `${GithubProvider.GITHUB_URL}${url}`, cacheKey });
    return response;
  }
}

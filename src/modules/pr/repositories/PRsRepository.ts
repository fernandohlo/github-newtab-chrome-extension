import { injectable, inject } from 'inversify';
import PRsProvider from '../providers/PRsProvider';

@injectable()
export default class PRsRepository {
  private _provider: PRsProvider;

  constructor (@inject(PRsProvider) provider: PRsProvider) {
    this._provider = provider;
  }

  getPRs (): Promise<any> {
    return this._provider.getPRs();
  }

  getPRReview (number: string): Promise<any> {
    return this._provider.getPRReview(number);
  }

  getPR (number: string): Promise<any> {
    return this._provider.getPR(number);
  }
}

import { injectable, inject } from 'inversify';
import PRsRepository from '../repositories/PRsRepository';

@injectable()
export default class PRsManager {
  private _repository: PRsRepository;

  public constructor (@inject(PRsRepository) repository: PRsRepository) {
    this._repository = repository;
  }

  getPRs (): Promise<any> {
    return this._repository.getPRs();
  }

  getPRReview (number: string): Promise<any> {
    return this._repository.getPRReview(number);
  }

  getPR (number: string): Promise<any> {
    return this._repository.getPR(number);
  }
}

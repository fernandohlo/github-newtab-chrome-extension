import { injectable, inject } from 'inversify';
import NotificationsProvider from '../providers/NotificationsProvider';

@injectable()
export default class NotificationsRepository {
  private _provider: NotificationsProvider;

  constructor (@inject(NotificationsProvider) provider: NotificationsProvider) {
    this._provider = provider;
  }

  getNotifications (): Promise<any> {
    return this._provider.getNotifications();
  }

  async markAllRead (): Promise<any> {
    await this._provider.markAllRead();
  }
}

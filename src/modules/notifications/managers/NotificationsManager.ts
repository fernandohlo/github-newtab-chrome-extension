import { injectable, inject } from 'inversify';
import NotificationsRepository from '../repositories/NotificationsRepository';
import NotificationsFactory from '../factories/NotificationsFactory';

@injectable()
export default class NotificationsManager {
  private _repository: NotificationsRepository;

  public constructor (@inject(NotificationsRepository) repository: NotificationsRepository) {
    this._repository = repository;
  }

  async getNotifications (): Promise<any> {
    const notifications = await this._repository.getNotifications();

    notifications.forEach((notification: any) => {
      NotificationsFactory.create(notification);
    });

    if (notifications) {
      await this._repository.markAllRead();
    }
  }
}

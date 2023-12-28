import { injectable } from 'inversify';
import GithubProvider from '@/modules/github/providers/GithubProvider';

@injectable()
export default class NotificationsProvider extends GithubProvider {
  static get CACHE_KEY () {
    return 'notifications';
  }

  async getNotifications () {
    let result = await this.execute(GithubProvider.NOTIFICATIONS_URL, `${NotificationsProvider.CACHE_KEY}`);

    if (result && Array.isArray(result)) {
      result = result.filter((notification) => {
        if (notification.reason === 'review_requested' && GithubProvider.GITHUB_REPO?.includes(notification.repository.name)) {
          return true;
        } else {
          return false;
        }
      });
    }

    return result;
  }

  async markAllRead () {
    await this.execute(GithubProvider.NOTIFICATIONS_URL, `${NotificationsProvider.CACHE_KEY}`, { method: 'PUT' });
  }
}

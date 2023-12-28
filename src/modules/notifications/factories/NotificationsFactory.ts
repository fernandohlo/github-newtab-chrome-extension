export default class NotificationsFactory {
  static create (notification: any) {
    if (chrome && chrome.notifications) {
      chrome.notifications.create(
        notification.id,
        {
          type: 'basic',
          iconUrl: 'image.jpeg',
          title: notification.subject.type,
          message: notification.subject.title
        },
        function () {}
      );
    } else {
      const notificationWeb = new Notification(notification.subject.type, { body: notification.subject.title, icon: 'image.jpeg' });
      console.log(notificationWeb);
    }
  }
}

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import ManifestFactory from '@/modules/manifest/factories/ManifestFactory';
import UnsplashFactory from '@/modules/unsplash/factories/UnsplashFactory';
import $serviceManager from '@/modules/core/ServiceManager';
import NotificationsManager from '@/modules/notifications/managers/NotificationsManager';

import Clock from '@/modules/clock/components/Clock.vue';
import Dashboard from '@/modules/dashboard/components/Dashboard.vue';

const manifestData = ManifestFactory.getData();

onBeforeMount(async () => {
  const notificationsManager = $serviceManager.resolve(NotificationsManager);
  if (!chrome || !chrome.notifications) {
    Notification.requestPermission().then(() => {
      notificationsManager.getNotifications();
    });
  } else {
    notificationsManager.getNotifications();
  }

  UnsplashFactory.setPhoto();

  setInterval(async () => {
    await notificationsManager.getNotifications();
  }, 60000); // 1min
});
</script>

<template>
  <div class="wrapper-info">
    <div class="top">
      <clock />
      <h1>Github dashboard <em>♥ <a href="https://github.com/fernandohlo">@fernandohlo</a> | <span class="version">{{ manifestData.version }}</span></em></h1>
    </div>
    <div class="end">
      <dashboard />
    </div>
  </div>
</template>

<style scoped>
</style>

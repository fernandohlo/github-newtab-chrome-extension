<script setup lang="ts">
import { onBeforeMount } from 'vue';
import ManifestFactory from '@/modules/manifest/factories/ManifestFactory';
import UnsplashFactory from '@/modules/unsplash/factories/UnsplashFactory';

import Clock from '@/modules/clock/components/Clock.vue';
import Dashboard from '@/modules/dashboard/components/Dashboard.vue';

const manifestData = ManifestFactory.getData();

onBeforeMount(() => {
  UnsplashFactory.setPhoto();
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

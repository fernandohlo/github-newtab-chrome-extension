<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import Clock from './components/Clock.vue';
import Dashboard from './components/Dashboard.vue';

import { getManifest } from './services/manifest.js';
import { setUnsplashPhoto } from './services/unsplash.js';

const manifestData = getManifest();
const version = ref(manifestData.version);

onBeforeMount(() => {
  setUnsplashPhoto();
});
</script>

<template>
  <div class="wrapper-info">
    <div class="top">
      <clock />
      <h1>Github dashboard <em>♥ <a href="https://github.com/fernandohlo">@fernandohlo</a> | <span class="version">{{ version }}</span></em></h1>
    </div>
    <div class="end">
      <dashboard />
    </div>
  </div>
</template>

<style scoped>
</style>

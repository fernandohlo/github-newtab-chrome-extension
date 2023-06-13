<script setup lang="ts">
  import { onMounted } from 'vue'
  import { start } from './services/app.js';

  onMounted(() => {
    start();
  })
</script>

<template>
  <div class="wrapper-info">
    <div class="top">
      <div id="clock" class="wrapper-info-clock"></div>
      <h1>Github dashboard <em>♥ <a href="https://github.com/fernandohlo">@fernandohlo</a> | <span id="version" class="version"></span></em></h1>
    </div>
    <div class="end">
      <div id="data_blocks" class="wrapper-info-blocks"></div>
    </div>
  </div>
</template>

<style scoped>
</style>

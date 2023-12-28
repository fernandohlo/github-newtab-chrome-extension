<script setup lang="ts">
import { onMounted, ref } from 'vue';

const toggle = ref(false);
const h = ref('00');
const m = ref('00');

const _startTime = () => {
  const today = new Date();
  h.value = today.getHours().toString();
  m.value = today.getMinutes().toString().padStart(2, '0');

  toggle.value = !toggle.value;
  setTimeout(_startTime, 500);
};

onMounted(() => {
  _startTime();
});
</script>

<template>
  <div class="wrapper-info-clock">
    {{ h }}<span :class="{ hide: toggle }">:</span>{{ m }}
  </div>
</template>

<style scoped>
</style>

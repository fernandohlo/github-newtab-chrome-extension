<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import PullRequestsBlock from '@/modules/pr/components/PullRequestsBlock.vue';
import { clearAll } from '@/modules/core/helpers/cache';
import $serviceManager from '@/modules/core/ServiceManager';
import PRsManager from '@/modules/pr/managers/PRsManager';

const GITHUB_USER = localStorage.getItem('GITHUB_USER') || undefined;
const GITHUB_LABEL = localStorage.getItem('GITHUB_LABEL');
const GITHUB_LABEL_IMPORTANT = localStorage.getItem('GITHUB_LABEL_IMPORTANT');

const modeAdmin = ref(false);
const PRs = ref([]);

const PRsCount = computed(() => PRs.value.length);

onMounted(async () => {
  const prsManager = $serviceManager.resolve(PRsManager);
  PRs.value = await prsManager.getPRs();

  const keysPressed:any = {};
  document.addEventListener('keydown', async (event) => {
    keysPressed[event.key] = true;

    if (keysPressed.Control && event.code === 'Space') {
      PRs.value = [];
      await clearAll();
      PRs.value = await prsManager.getPRs();
      return;
    }
    if (event.code === 'Space') {
      modeAdmin.value = !modeAdmin.value;
    }
  });

  document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
  });

  setInterval(async () => {
    PRs.value = [];
    await clearAll();
    PRs.value = await prsManager.getPRs();
  }, 300000); // 5min
});
</script>

<template>
  <div class="loading" v-if="PRs.length === 0">
    <span class="loader"></span> <span class="text">loading pull request ...</span>
  </div>
  <div class="wrapper-info-blocks" v-else>
    <div class="wrapper-info-all-prs"><a href="https://github.com/inditex/web-ecommercebershkafrontnodejs/pulls">View all PRs ({{ PRsCount }})</a></div>
    <template v-if="!modeAdmin">
      <pull-requests-block id="data_by_user" :prs="PRs" :title="GITHUB_USER" type="user" :filter="GITHUB_USER" />
      <pull-requests-block id="data_me" :prs="PRs" :title="'@me'" type="me" :filter="GITHUB_USER" />
      <pull-requests-block id="data_by_squad" :prs="PRs" :title="GITHUB_LABEL" type="squad" :cssClass="'w100'" :filter="GITHUB_LABEL" v-if="GITHUB_LABEL" />
      <pull-requests-block id="data_by_label" :prs="PRs" :title="GITHUB_LABEL_IMPORTANT" type="label" :cssClass="'w100'" :filter="GITHUB_LABEL_IMPORTANT" v-if="GITHUB_LABEL_IMPORTANT" />
    </template>
    <template v-else>
      <pull-requests-block id="data" :prs="PRs" :title="'all'" type="admin" :cssClass="'w100'" />
    </template>
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import PullRequestsBlock from './PullRequestsBlock.vue';

  const GITHUB_USER = localStorage.getItem('GITHUB_USER');
  const GITHUB_LABEL = localStorage.getItem('GITHUB_LABEL');
  const GITHUB_LABEL_IMPORTANT = localStorage.getItem('GITHUB_LABEL_IMPORTANT');

  const modeAdmin = ref(false);

  onMounted(() => {
    document.addEventListener('keydown', (e) => {
      if(e.code === 'Space') {
        modeAdmin.value = !modeAdmin.value;
      }
    });
  })
</script>

<template>
  <div class="wrapper-info-blocks">
    <template v-if="!modeAdmin">
      <pull-requests-block id="data_by_user" :title="GITHUB_USER" type="user" :filter="GITHUB_USER" />
      <pull-requests-block id="data_me" :title="'@me'" type="me" />
      <pull-requests-block id="data_by_squad" :title="GITHUB_LABEL" type="squad" :cssClass="'w100'" :filter="GITHUB_LABEL" v-if="GITHUB_LABEL" />
      <pull-requests-block id="data_by_label" :title="GITHUB_LABEL_IMPORTANT" type="label" :cssClass="'w100'" :filter="GITHUB_LABEL_IMPORTANT" v-if="GITHUB_LABEL_IMPORTANT" />
    </template>
    <template v-else>
      <pull-requests-block id="data" :title="'all'" type="admin" :cssClass="'w100'" />
    </template>
  </div>
</template>

<style scoped>
</style>

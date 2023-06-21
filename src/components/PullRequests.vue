<script setup lang="ts">
  import PullRequest from './PullRequest.vue';

  defineProps({
    items: Array<any>
  });

  const getCssClasses = (item:any) => {
    const cssClass = [];
    const GITHUB_USER = localStorage.getItem('GITHUB_USER');

    if (item.reviewsInfo.some((review:any) => review.user.login === GITHUB_USER && (review.state === 'APPROVED' || review.state === 'CHANGES_REQUESTED'))) {
      cssClass.push('me');
    }

    if (item.labels.some((label:any) => label.name === 'status/work-in-progress')) {
      cssClass.push('disabled');
    }

    return cssClass;
  };
</script>

<template>
  <ul>
    <li v-for="item in items" :class="getCssClasses(item)">
     <pull-request :item="item" />
    </li>
  </ul>
</template>

<style scoped>
</style>

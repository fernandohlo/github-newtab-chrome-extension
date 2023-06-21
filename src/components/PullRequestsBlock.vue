<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import PullRequests from './PullRequests.vue';
  import { filterByLabel, filterByUser, filterByReviewUser, filterForAdmin } from '../services/pr/filter.js';

  const mapTypeFactory:Object = {
    'user': filterByUser,
    'me': filterByReviewUser,
    'squad': filterByLabel,
    'label': filterByLabel,
    'admin': filterForAdmin
  };

  const props = defineProps({
    type: {
      type: String,
      required: true,
      default: 'user'
    },
    prs: {
      type: Array,
      required: true
    },
    filter: String,
    title: String,
    id: String,
    cssClass: String
  });

  const items = ref([]);
  const total = computed(() => {
    return items.value.length;
  });
  const typeFactory:Function = mapTypeFactory[props.type as keyof Object];

  watch(() => props.prs, (prs) => {
    items.value = typeFactory(prs, props.filter);
  }, { immediate: true });
</script>

<template>
  <div id="{{ id }}" class="wrapper-info-data" :class="cssClass">
    <h2><em>{{ total }}</em>{{ title }}</h2>
    <pull-requests :items="items" v-if="items.length > 0" />
  </div>
</template>

<style scoped>
</style>

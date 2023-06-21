<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { listPRsUser, listPRsReviewRequested, listPRsSquad, listPRsInternal, listPRs } from '../services/pr/repository.js';
  import PullRequest from './PullRequest.vue';

  const mapTypeFactory:Object = {
    'user': listPRsUser,
    'me': listPRsReviewRequested,
    'squad': listPRsSquad,
    'label': listPRsInternal,
    'admin': listPRs
  };

  const props = defineProps({
    type: {
      type: String,
      required: true,
      default: 'user'
    },
    filter: String,
    title: String,
    id: String,
    cssClass: String
  });

  const items = ref([]);
  const total = ref(0);

  onMounted(async () =>{
    const typeFactory:Function = mapTypeFactory[props.type as keyof Object];
    
    items.value = await typeFactory(props.filter);
    total.value = items.value.length;

    setInterval(async () => {
      items.value = await typeFactory(props.filter);
    }, 180000); // 3min
  });
</script>

<template>
  <div id="{{ id }}" class="wrapper-info-data" :class="cssClass">
    <h2><em>{{ total }}</em>{{ title }}</h2>
    <pull-request :items="items" />
  </div>
</template>

<style scoped>
</style>

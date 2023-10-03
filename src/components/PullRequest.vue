<script setup lang="ts">
import { watch, ref } from 'vue';
import User from './User.vue';
import { getPRReview, getPR } from '../services/pr/repository.js';

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => {}
  }
});

const prReviews = ref<any[]>([]);
const prInfo = ref();

const isImportantBranch = () => {
  return (
    prInfo.value.base.ref === 'release' ||
      prInfo.value.base.ref === 'main'
  );
};

watch(() => props.item, async (newItem) => {
  prReviews.value = [...await getPRReview(newItem.number), ...newItem.requested_reviewers.map((user:any) => {
    return {
      user,
      state: 'PENDING'
    };
  })];
  prInfo.value = await getPR(newItem.number);
}, { immediate: true });
</script>

<template>
  <template v-if="prInfo && prInfo.head">
    <span class="icon">
      <user :user="item.user" />
    </span>
    <a :href="item.html_url">
      {{ item.title }}<br/>
      <span class="login">{{ item.user.login }} #{{ item.number }} > {{ prInfo.head.ref }} </span>
    </a>
    <span class="branch" :class="{ important: isImportantBranch() }">
      <b>{{ prInfo.base.ref }}</b>
    </span>
    <span class="info">
      <template v-for="review in prReviews" :key="review.user.id">
        <user :user="review.user" :review="review" />
      </template>
      <span class="status" :class="{ merge: prInfo.mergeable, ok: prInfo.mergeable_state === 'clean' }">
        ✓
      </span>
    </span>
  </template>
</template>

<style scoped>
</style>

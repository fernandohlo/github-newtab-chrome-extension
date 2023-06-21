<script setup lang="ts">
  defineProps({
    user: Object as any,
    review: Object as any
  });

  const isValidReview = (review:any) => {
    if (!review || review.state === 'PENDING') {
      return true;
    }
    return (
      review.state === 'APPROVED' ||
      review.state === 'CHANGES_REQUESTED'
    );
  };
</script>

<template>
  <span
    class="user"
    :class="{ pending: review && review.state === 'PENDING' }"
    :title="user.login"
    :style="`background-image: url('${user.avatar_url}');`"
    v-if="isValidReview(review)"
  >
    <span class="tick ok" v-if="review && review.state === 'APPROVED'">✓</span>
    <span class="tick ko" v-if="review && review.state === 'CHANGES_REQUESTED'">X</span>
  </span>
</template>

<style scoped>
</style>

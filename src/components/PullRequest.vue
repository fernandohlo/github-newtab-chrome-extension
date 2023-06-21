<script setup lang="ts">
  import User from './User.vue';

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

  const isImportantBranch = (item:any) => {
    return (
      item.prInfo.base.ref === 'release' ||
      item.prInfo.base.ref === 'main'
    );
  };
</script>

<template>
  <ul>
    <li v-for="item in items" :class="getCssClasses(item)">
      <span class="icon">
        <user :user="item.user" />
      </span>
      <a :href="item.html_url">
        {{ item.title }}<br/>
        <span class="login">{{ item.user.login }} #{{ item.number }} > {{ item.prInfo.head.ref }} </span>
      </a>
      <span class="branch" :class="{ important: isImportantBranch(item) }">
        <b>{{ item.prInfo.base.ref }}</b>
      </span>
      <span class="info">
        <template v-for="review in item.reviewsInfo">
          <user :user="review.user" :review="review" />
        </template>
        <span class="status" :class="{ merge: item.prInfo.mergeable, ok: item.prInfo.mergeable_state === 'clean' }">
          ✓
        </span>
      </span>
    </li>
  </ul>
</template>

<style scoped>
</style>

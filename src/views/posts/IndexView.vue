<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'
import PostPreview from '@/components/PostPreview.vue'
import router from "@/router";
import { DateTime } from 'luxon'

const postsStore = usePostsStore()
postsStore.search()

function openPost(fileName) {
  router.push({
    name: 'postsView',
    params: { fileName }
  })
}

function monthYear(utcTime: number) {
  const monthDate = DateTime.fromMillis(Number(utcTime))
  return monthDate.toFormat('LLLL y')
}
</script>

<template>
  <div v-if="postsStore.loading" class="loader">LOADING</div>

  <template v-for="(categorisedPosts, key) in postsStore.categorisedPosts">
    <div class="category-title text-title">{{ monthYear(key) }}</div>
    <div class="postGrid">
      <post-preview
        v-for="(post, index) in categorisedPosts"
        :key="post.fileName"
        :post="post"
        :isLastItem="index + 1 === postsStore.posts.length"
        @click="openPost(post.fileName)"
      />
    </div>
  </template>
</template>

<style scoped>
.category-title {
  padding: 1rem 0 .5rem 1rem;
}

.postGrid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem;
}

.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background: radial-gradient(var(--vt-c-dark-mute-alpha), var(--vt-c-dark));

  display: grid;
  align-items: center;
  justify-items: center;

  font-weight: bolder;
}

@media only screen and (min-width: 16rem) {
  .postGrid {
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }
}
</style>

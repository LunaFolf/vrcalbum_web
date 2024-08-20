<script setup lang="ts">
import PostPreview from '@/components/PostPreview.vue'
import router from "@/router";
import { DateTime } from 'luxon'
import {getSeries} from "@/api/folf/posts";

const series = await getSeries()

function openPost(fileName: string) {
  router.push({
    name: 'postsView',
    params: { fileName }
  })
}

function sessionName(sessionKey: number) {
  const imageDate = series[sessionKey][0].date
  return DateTime.fromISO(imageDate).toLocaleString(DateTime.DATETIME_FULL)
}

</script>

<template>
  <div v-for="(images, key) in series">
    <div class="category-title text-title">{{ sessionName(key) }}</div>
    <div class="postGrid">
      <post-preview
        v-for="(post, index) in images"
        :key="post.fileName"
        :post="post"
        :isLastItem="index + 1 === images.length"
        @click="openPost(post.fileName)"
      />
    </div>
  </div>
</template>

<style scoped>
.category-title {
  padding: 1rem 0 .5rem 1rem;
  color: var(--vt-c-secondary)
}

.postGrid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem;
}

@media only screen and (min-width: 16rem) {
  .postGrid {
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }
}
</style>

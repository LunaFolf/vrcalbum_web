<script setup lang="ts">
import PostPreview from '@/components/PostPreview.vue'
import { DateTime } from 'luxon'
import {usePhotoStore} from "@/stores/photos";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

console.log('query', route.query)

const photoStore = usePhotoStore();
photoStore.loadNewImages().then(() => {
  const fileName = route.query.fileName
  const imageEl = document.getElementById(fileName)
  if (fileName) {
    console.log('Scrolling to', fileName, imageEl)
    imageEl?.scrollIntoView();
  }
})

function openPost(fileName: string) {
  router.push({
    name: 'postsView',
    params: { fileName }
  })
}

function sessionName(sessionIndex: number) {
  const sessionName = `Session ${photoStore.sessions.length - sessionIndex}`
  const photoCount = photoStore.sessions[sessionIndex].length

  return `${sessionName} [${photoCount} photo${photoCount > 1 ? 's' : ''}]`
}
</script>

<template>
  <template v-if="photoStore.sessions.length">
    <section v-for="(images, key) in photoStore.sessions" :key="key" class="session">
      <h4>{{ sessionName(key) }}</h4>
      <div class="image-grid">
        <post-preview
          v-for="fileName in images"
          :key="fileName"
          :file-name="fileName"
          :post="photoStore.getPhoto(fileName)"
          @click="openPost(fileName)"
        />
      </div>
    </section>
  </template>
  <template v-else>
    loading :3
  </template>
</template>

<style scoped>
.session {
  margin-bottom: 40px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
</style>

<script setup lang="ts">
import PostPreview from '@/components/PostPreview.vue'
import { DateTime } from 'luxon'
import {usePhotoStore} from "@/stores/photos";
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";

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

const sessionKey = computed(() => {
  var index = Number(route.params?.sessionKey)
  if (index <= 0) index = 1

  return photoStore.sessions.length - index
})

</script>

<template>
  <template v-if="photoStore.sessions.length">
    <h4>{{ photoStore.getSessionName(sessionKey) }}</h4>
      <div class="image-grid">
        <post-preview
          v-for="fileName in photoStore.sessions[sessionKey]"
          :key="fileName"
          :file-name="fileName"
          :post="photoStore.getPhoto(fileName)"
          @click="openPost(fileName)"
        />
      </div>

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

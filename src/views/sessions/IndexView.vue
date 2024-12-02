<script setup lang="ts">
import {usePhotoStore} from "@/stores/photos";

const photoStore = usePhotoStore();
photoStore.loadNewImages()
</script>

<template>
  <div class="sessions">
    <div
      class="session-card"
      v-for="(sessionImages, sessionKey) in photoStore.sessions"
      @click="$router.push({
      name: 'sessionView',
      params: { sessionKey: photoStore.sessions.length - sessionKey }
      })"
    >
      <img :src="photoStore.getThumbnailFromPath(sessionImages[0])" :alt="photoStore.getSessionName(sessionKey)" />
      <div class="image-overlay">
        <p> {{ photoStore.getSessionName(sessionKey) }} </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sessions {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.session-card {
  position: relative;
  overflow: hidden;
  border-radius: .5rem;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  aspect-ratio: 16 / 9;
  cursor: pointer;
}

.session-card:hover {
  transform: scale(1.05);
}

.session-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  bottom: -.125rem;
  left: -.125rem;
  right: -.125rem;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px;
  transition: transform 0.3s ease;
}
</style>

<script setup lang="ts">
import {defineProps} from 'vue'

const props = defineProps({
  post: Object,
  fileName: String
})

function getUrlFromPath(path: string) {
  return `https://cdn.folf.io/vrc_album/${path}`
}

function formattedDate() {
  return new Date(props.post.date).toLocaleString()
}

function resolution() {
  const splitByPeriod = props.fileName.split('.')
  splitByPeriod.pop()
  const splitByUnderscore = splitByPeriod.join('.').split('_')
  return splitByUnderscore.pop()
}

</script>

<template>
  <div class="image-card" :id="fileName">
    <img :src="getUrlFromPath(post.thumbName)" :alt="post.fileName" />
    <div class="image-overlay">
      <p>{{ formattedDate() }}</p>
      <p>{{ resolution() }}</p>
    </div>
  </div>
</template>

<style scoped>
.image-card {
  position: relative;
  overflow: hidden;
  border-radius: .5rem;
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  aspect-ratio: 16 / 9;
  cursor: pointer;
}

.image-card:hover {
  transform: scale(1.05);
}

.image-card img {
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
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.image-card:hover .image-overlay {
  transform: translateY(0);
}

.image-overlay p {
  margin: 0;
  font-size: 1.125rem;
}
</style>

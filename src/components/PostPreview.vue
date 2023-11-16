<script setup lang="ts">
import {defineProps, watch} from 'vue'
import { vElementVisibility } from '@vueuse/components'
import { ref } from 'vue'
import router from '@/router'

const props = defineProps({
  post: Object,
  isLastItem: Boolean,
  full: Boolean,
})

const emit = defineEmits(['nextPage'])

const isVisible = ref(false)

if (props.isLastItem) {
  watch(isVisible, isVisible => {
    if (isVisible) emit('nextPage')
  })
}

function onElementVisibility(state: boolean) {
  if (props.isLastItem) isVisible.value = state
}

function getUrlFromPath(path: string) {
  return `https://cdn.folf.io/vrc_album/${path}`
}

</script>

<template>
  <div
    class="post"
    style="cursor: pointer"
    :class="[full ? 'full' : '']"
    v-element-visibility="onElementVisibility"
  >
    <img :src="full ? getUrlFromPath(post.fileName) : getUrlFromPath(post.thumbName)" alt="" />
  </div>
</template>

<style scoped>
.post {
  aspect-ratio: 1/1;
  position: relative;

  overflow: hidden;
}

.post.full {
  aspect-ratio: unset;
}

.post .artists {
  font-size: 1rem;
  line-height: 1.5rem;

  font-weight: 900;

  position: absolute;
  bottom: 0.25rem;
  right: 0.25rem;

  color: var(--vt-c-text-dark-1);

  filter: drop-shadow(0.25rem 0.25rem 0.125rem var(--vt-c-dark));
}

.post .icons {
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;

  grid-auto-flow: column;

  display: grid;
  gap: 0.125rem;
}

.post img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post.safe,
.post.questionable,
.post.explicit {
  border-bottom-style: inset;
  border-bottom-width: 0.25rem;
}

.post.safe {
  border-color: seagreen;
}
.post.questionable {
  border-color: darkorange;
}
.post.explicit {
  border-color: mediumvioletred;
}
</style>

<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute()
</script>

<template>
  <div class="title" v-if="$route.name !== 'postsView'">
    <div class="actions">
      <font-awesome-icon
        v-if="$route.name !== 'home'"
        :icon="['fas', 'home']"
        @click="$router.push('/home')"
      />
    </div>
    <div>
      <div class="title-text">Welcome to <strong class="clickable">VRC Folf</strong></div>
      <div v-if="route.name === 'home'" class="title-body">
        <p>This site contains all my archived photos from VRChat</p>
        <p>If you have any issues, my contact details are available at <a href="https://luna.folf.io" target="_blank">https://luna.folf.io/</a></p>
      </div>
    </div>
  </div>
    <Suspense>
        <RouterView />
    </Suspense>
</template>

<style scoped>
.title {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
}

.actions {
  display: flex;
  align-items: center;
  justify-items: center;

  color: var(--vt-c-secondary);
}

.actions * {
  cursor: pointer;
}

.title :not(.actions) {
  text-align: center;
}

strong {
  color: var(--vt-c-secondary);
}

.title-text {
  font-size: 3rem;
  line-height: 3.5rem;
}

.title-body {
  margin-bottom: 2rem;
}
</style>

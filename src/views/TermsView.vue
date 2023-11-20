<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/authentication'
import { useRoute, useRouter } from 'vue-router'

const authStore = useAuthenticationStore()
const route = useRoute()
const router = useRouter()

function declineAgreement() {
  window.close()
}

function agreeAgreement() {
  authStore.agreeToTerms(true)

  const returnPath = route.query.returnTo || { name: 'posts' }
  console.log('returning to', returnPath)
  router.push(returnPath)
}
</script>

<template>
  <main>
    <div class="container">
      <div class="title">Wait!</div>
      <div class="body">
        <p>
          This page contains auto-uploaded content from VRChat Photos, some of which is suggestive content.
        </p>
        <p>
          While <em>some</em> level of care has been taken to try avoid uploading NSFW content, it is not impossible that some may have been uploaded.
        </p>
        <p>By continuing, you agree you are over 18 and acknowledge that you may see suggestive and/or NSFW content.</p>
      </div>
      <div class="actions">
        <button @click="agreeAgreement">I agree, and am over 18</button>
        <button @click="declineAgreement">I do not agree, or am not over 18</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;

  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 90vw;

  justify-content: center;
  align-items: center;
}

.title {
  text-align: center;
  font-size: 3rem;
  line-height: 3.5rem;
  letter-spacing: .25rem;

  font-weight: bold;
}

.body,
.actions {
  display: grid;
  font-size: 1rem;
  line-height: 1.5rem;

  font-family: sans-serif;

  gap: 0.5rem;
}

@media only screen and (min-width: 48rem) {
  main {
    grid-template-columns: 50vw;
  }
}
</style>

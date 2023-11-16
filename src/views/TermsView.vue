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

  const returnPath = route.query.returnTo

  console.log('returning to', returnPath || { name: 'posts' })

  router.push(returnPath || { name: 'posts' })
}
</script>

<template>
  <main>
    <div class="container">
      <div class="title">Over 18?</div>
      <div class="body">
        <p>
          You must be over the age of 18, and agree to
          <a href="https://e621.net/static/terms_of_service">e621's terms of service</a>, to access
          this page.
        </p>
        <p>
          By default, a limited blacklist has been applied hiding content that is commonly objected
          to.
        </p>
        <div>
          <p class="strikethrough">
            You may remove items from this blacklist by using the blacklist menu item.
          </p>
          <em>This feature isn't available yet.</em>
        </div>
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
  grid-template-columns: 50vw;

  justify-content: center;
  align-items: center;
}

.title {
  text-align: center;
  font-size: 3rem;
  line-height: 3.5rem;

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

@media only screen and (max-width: 520px) {
  main {
    grid-template-columns: 90vw
  }
}
</style>

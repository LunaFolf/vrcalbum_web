import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useAuthenticationStore = defineStore('authentication', () => {
  const token = useLocalStorage('auth_token', '')
  const userIsAuthenticated = computed(() => token.value.length > 0)
  const userAgreedToTerms = useLocalStorage('agreed_to_terms', false)

  function agreeToTerms(userAgreed: boolean) {
    if (!userAgreed) console.error('Dafuq you mean nu-uh??')
    else userAgreedToTerms.value = true
  }

  return { token, agreeToTerms, userAgreedToTerms, userIsAuthenticated }
})

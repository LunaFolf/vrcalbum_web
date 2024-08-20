import { createRouter, createWebHistory } from 'vue-router'
import { useAuthenticationStore } from '@/stores/authentication'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'terms',
      component: () => import('../views/TermsView.vue')
    },
    {
      path: '/posts',
      name: 'posts',
      redirect: '/series'
    },
    {
      path: '/series',
      name: 'series',
      component: () => import('../views/posts/SeriesView.vue')
    },
    {
      path: '/posts/:fileName',
      name: 'postsView',
      component: () => import('../views/posts/DetailView.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  const authStore = useAuthenticationStore()
  if (!authStore.userAgreedToTerms && to.name !== 'terms') {
    console.log('a')
    return { name: 'terms', query: { returnTo: to.path } }
  }

  if (authStore.userAgreedToTerms && to.name === 'terms') {
    let sendTo = from.name || 'posts'
    if (sendTo === 'terms') sendTo = 'posts'

    return { name: sendTo }
  }
})

export default router

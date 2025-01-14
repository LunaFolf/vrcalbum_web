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
      redirect: '/home',
    },
    {
      path: '/series',
      name: 'series',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: () => import('../views/sessions/IndexView.vue')
    },
    {
      path: '/sessions/:sessionKey',
      name: 'sessionView',
      component: () => import('../views/sessions/SeasonView.vue')
    },
    {
      path: '/everything',
      name: 'everything',
      component: () => import('../views/posts/SeriesView.vue'),
      beforeEnter: (to, from, next) => {
        console.log('hi', to, from)
        if (from.name === 'postsView' && (to.query.fileName !== from.params.fileName)) {
          console.log('pushing to everything with query')
          next({
            name: 'everything',
            query: {
              fileName: from.params.fileName
            }
          })
        } else {
          console.log('continuing as normal')
          next()
        }
      }
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
  console.log('a', to, from)
  if (!authStore.userAgreedToTerms && to.name !== 'terms') {
    console.log('b')
    return { name: 'terms', query: { returnTo: to.path } }
  }

  console.log('c')
  if (authStore.userAgreedToTerms && to.name === 'terms') {
    let sendTo = from.name || 'posts'
    if (sendTo === 'terms') sendTo = 'posts'

    console.log('d')
    return { name: sendTo }
  }
})

export default router

import { defineStore } from 'pinia'
import { useSessionStorage } from '@vueuse/core'
import { getPosts } from '@/api/folf/posts'
import {computed, ref, watch} from 'vue'

function mergePostArrays(original: Post[], newData: Post[]): Post[] {
  const posts = [...original]

  newData.forEach((post) => {
    const alreadyHavePost = posts.findIndex((p) => p.id === post.id) > -1

    if (!alreadyHavePost) posts.push(post)
  })

  return posts
}

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([] as Post[])
  const loading = ref(false)

  const categorisedPosts = computed(() => {
    const categorisedPosts = {}

    posts.value.forEach(post => {
      const imageDate = new Date(post.date)
      const imageMonth = `${new Date(imageDate.getFullYear(), imageDate.getMonth(), 1).getTime()}`

      if (!categorisedPosts[imageMonth]) categorisedPosts[imageMonth] = []

      categorisedPosts[imageMonth].push(post)
    })

    return categorisedPosts
  })

  async function getPost(fileName: string) {
    console.log('Checking cache for post', fileName)

    let post = posts.value.find((post) => {
      return post.fileName === fileName
    })

    if (!post) {
      console.log('Nothing in cache, checking via API')
      await search()
    }

    post = posts.value.find((post) => {
      return post.fileName === fileName
    })

    console.log('Found post', post)

    return post
  }

  async function search() {
    setLoading(true)
    posts.value = await getPosts()
    setLoading(false)
  }

  function getPagination(fileName: string) {
    const currentIndex = posts.value.findIndex(post => post.fileName === fileName)
    const previousFile = posts.value[currentIndex - 1]?.fileName
    const nextFile = posts.value[currentIndex + 1]?.fileName

    return {
      currentIndex,
      previousFile,
      nextFile
    }
  }

  function clear() {
    posts.value = []
  }

  function setLoading(state: boolean) {
    loading.value = state
  }

  return {
    posts,
    loading,
    categorisedPosts,
    getPost,
    search,
    getPagination
  }
})

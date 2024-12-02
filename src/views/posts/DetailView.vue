<script setup lang="ts">
import {onBeforeRouteLeave, useRoute, useRouter} from 'vue-router'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {Ref, ref, watch} from "vue";
import {usePhotoStore} from "@/stores/photos";

const photoStore = usePhotoStore();
const route = useRoute()
const router = useRouter()

const navigation = ref({})

const postMediaPlaceholderStyle = ref('')

async function refreshNav() {
  if (photoStore.sessions.length <= 1) await photoStore.loadNewImages()
  console.log('refreshing nav')
  navigation.value = photoStore.getPagination(route.params.fileName)
  console.log(navigation.value)
}

refreshNav()

function openPost(fileName) {
  router.push({
    name: 'postsView',
    params: { fileName }
  }).then(() => {
    refreshNav() // this feels wrong but fuck it im tired
  })
}

function getUrlFromPath(path: string) {
  return `https://cdn.folf.io/vrc_album/${path}`
}

const navigationHandler = ({ key }) => {
  if (key === 'ArrowLeft' && navigation.value.previousFile) openPost(navigation.value.previousFile)
  if (key === 'ArrowRight' && navigation.value.nextFile) openPost(navigation.value.nextFile)
}

window.addEventListener('keyup', navigationHandler)

onBeforeRouteLeave(() => {
    window.removeEventListener('keyup', navigationHandler)
})

window.scrollTo(0,0)
</script>

<template>
  <div class="fab" @click="router.back()">
    <font-awesome-icon icon="backward" />
  </div>
  <div>
    <div class="postMedia">
      <img :key="route.params.fileName" :src="getUrlFromPath(route.params.fileName)" :alt="route.params.fileName" :style="postMediaPlaceholderStyle" />

      <div id="postNavigation" class="postNavigation">
        <button v-if="navigation.previousFile" class="left" @click="openPost(navigation.previousFile)">
          <font-awesome-icon :icon="['fad', 'square-arrow-left']" transform="grow-16" />
        </button>
        <button v-if="navigation.nextFile" class="right" @click="openPost(navigation.nextFile)">
          <font-awesome-icon :icon="['fad', 'square-arrow-right']" transform="grow-16" />
        </button>
      </div>

      <div class="postNavigationTip">
        <p>TIP: You can use your left and right arrow keys to scroll posts</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.postGrid {
  display: grid;
  grid-template-columns: 1fr auto;

  font-family: sans-serif;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
}

.postGrid .postInfo,
.postGrid .postTags {
  padding: 1rem;
}

.postNavigationTip, .postNavigation {
  position: absolute;
  width: 100%;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
}

.postNavigation {
  display: grid;
  padding: .5rem 1rem;
  grid-template-columns: repeat(2, max-content);
  grid-template-areas: 'left right';
  justify-content: space-between;
  gap: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

.postNavigationTip {
  text-align: center;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 1000;
  top: calc(100% - 2.75rem);
  background-color: rgba(0, 0, 0, 0.35);
  padding: .5rem 1rem;
}

.postNavigation .left {
  grid-area: left;
}

.postNavigation .right {
  grid-area: right;
}

.postTags {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  font-weight: 600;
}

.postTags .tagList {
  border-radius: .25rem;
  padding: .5rem .75rem;
  display: grid;
  gap: 0.25rem;

  box-shadow: 0 -0.25rem 4rem rgba(0, 0, 0, 20%);
}

.postTags .tagList .tag {
  display: grid;
  grid-template-columns: auto 1fr auto;

  justify-items: center;
  align-items: center;
  gap: 1rem;
}

.postTags .poolTags .tag {
  grid-template-columns: 1fr;
}

.postTags .tagList .tag .text {
  overflow: hidden;
  cursor: pointer;
}

.postMedia {
  display: flex;
  justify-content: center;
  max-height: calc(100vh - 1rem);
  max-width: 100vw;

  position: relative;
  box-shadow: inset 0 -0.25rem 1rem rgba(0, 0, 0, 50%);
}

.postMedia img,
.postMedia video {
  object-fit: scale-down;
  max-width: 100%;
}

@media only screen and (max-width: 520px) {
  .postGrid {
    grid-template-columns: 1fr;
  }

  .postTags .tagList {
    border-radius: unset;
    padding: unset;
    box-shadow: unset;
  }

  .postInfo {
    border-bottom: 1px solid var(--color-border);
  }

  .postNavigationTip {
    font-size: .75rem;
    line-height: 1.25rem;
    top: calc(100% - 1.25rem);
  }
}
</style>

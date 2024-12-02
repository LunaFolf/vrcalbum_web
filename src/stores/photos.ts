import {defineStore} from 'pinia'
import {getPhotos, getSeries} from "@/api/folf/posts";
import {ref} from "vue";

export const usePhotoStore = defineStore('photos', () => {
  const photos = ref({} as { [key: Post["fileName"]]: Post })
  const sessions = ref([] as Post["fileName"][][])

  async function loadNewImages() {
    photos.value = await getPhotos()
    sessions.value = await getSeries()
  }

  function getPhoto(fileName: Post["fileName"]) {
    return photos.value[fileName]
  }

  function getPagination(fileName: string) {
    const photoKeys = Object.keys(photos.value)
    const currentIndex = photoKeys.findIndex(key => key === fileName)
    const previousFile = photoKeys[currentIndex - 1]
    const nextFile = photoKeys[currentIndex + 1]

    return {
      currentIndex,
      previousFile,
      nextFile
    }
  }

  function getUrlFromPath(path: string) {
    return `https://cdn.folf.io/vrc_album/${path}`
  }

  function getThumbnailFromPath(path: string) {
    if (!path.endsWith('.png') && path.endsWith('THUMB.webp')) return `https://cdn.folf.io/vrc_album/${path}`
    if (path.endsWith('.png')) {
      const splitPath = path.split('.png')
      return `https://cdn.folf.io/vrc_album/${splitPath[0]}_THUMB.webp`
    }
  }

  function getSessionName(sessionIndex: number) {
    const sessionName = `Session ${sessions.value.length - sessionIndex}`
    const photoCount = sessions.value[sessionIndex].length

    return `${sessionName} [${photoCount} photo${photoCount > 1 ? 's' : ''}]`
  }

  return { photos, sessions, loadNewImages, getPhoto, getPagination, getUrlFromPath, getThumbnailFromPath, getSessionName }
})

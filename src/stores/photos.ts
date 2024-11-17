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

  return { photos, sessions, loadNewImages, getPhoto, getPagination }
})

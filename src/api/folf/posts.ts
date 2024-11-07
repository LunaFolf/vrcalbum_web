import {get} from '@/api/http'

export async function getPhotos(): Promise<{ [key: Post["fileName"]]: Post }> {
  return await get('https://cdn.folf.io/vrc_album/index.json') as { [key: Post["fileName"]]: Post }
}

export async function getSeries(): Promise<Post["fileName"][][]> {
  return await get('https://cdn.folf.io/vrc_album/series.json') as Post["fileName"][][]
}


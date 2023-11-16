import {get} from '@/api/http'

export async function getPosts(): Promise<any[]> {
  const data = await get('https://cdn.folf.io/vrc_album/index.json') as Post[]

  // convert data.posts to Post[]
  return data.map(post => {
    return post
  })
}


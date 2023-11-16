import {get} from '@/api/http'

export async function getPosts(): Promise<any[]> {
  const data = await get('http://cdn.folf.io.s3-website.eu-west-2.amazonaws.com/vrc_album/index.json') as Post[]

  // convert data.posts to Post[]
  return data.map(post => {
    return post
  })
}


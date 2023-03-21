import Request from '..'
import { MixinTwitterRes } from '../types'
import { TwitterAPI } from './gettwitterlist'

export async function createTwitter(
  uid: string,
  content: string,
  user_name: string,
  user_avatar: string
) {
  return Request.post<MixinTwitterRes>({
    url: TwitterAPI.CreateTwitter,
    data: {
      uid: uid,
      content: content,
      user_name: user_name,
      user_avatar: user_avatar
    }
  })
}

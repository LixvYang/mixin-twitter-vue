import Request from '..'
import { MixinTwitterRes } from '../types'

export enum TwitterCommentAPI {
  CreateTwitterComment = '/twittercomment/create',
  DeleteTwitterComment = '/twittercomment/delete',
  ListTwitterComment = '/twittercomment/list'
}

export async function createTwitterComment(
  tid: number,
  content: string,
  fid: string,
  from_user_name: string,
  from_user_avatar: string
) {
  return Request.post<MixinTwitterRes<any>>({
    url: TwitterCommentAPI.CreateTwitterComment,
    showLoading: false,
    data: {
      tid: tid,
      content: content,
      from_uuid: fid,
      from_user_name: from_user_name,
      from_user_avatar: from_user_avatar
    }
  })
}

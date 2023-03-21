import Request from '..'
import { MixinTwitterRes } from '../types'
import { TwitterCommentAPI } from './createtwittercomment'

export async function deleteTwitterComment(id: string, uid: string) {
  return Request.delete<MixinTwitterRes<any>>({
    url: TwitterCommentAPI.DeleteTwitterComment,
    showLoading: false,
    data: {
      id: id,
      uid: uid
    }
  })
}

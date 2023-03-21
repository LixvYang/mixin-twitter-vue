import Request from '..'
import { MixinTwitterRes } from '../types'
import { TwitterCommentAPI } from './createtwittercomment'

export interface TwitterCommentList {
  list?: List[]
}

export interface List {
  ID?: number
  CreatedAt?: Date
  UpdatedAt?: Date
  DeletedAt?: null
  tid?: number
  content?: string
  from_uuid?: string
  from_user_name?: string
  from_user_avatar?: string
  to_uid?: string
  to_user_name?: string
}

export async function listTwitterComment(tid: string) {
  return Request.get<MixinTwitterRes<TwitterCommentList>>({
    url: TwitterCommentAPI.ListTwitterComment + `?tid=${tid}`,
    showLoading: false
  })
}

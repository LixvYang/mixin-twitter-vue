import Request from '..'
import { MixinTwitterRes } from '../types'

export interface UserInfo {
  user_name?: string
  uid?: string
  identity_number?: string
  avatar_url?: string
  session_id?: string
  ID?: number
  CreatedAt?: Date
  UpdatedAt?: Date
  DeletedAt?: null
}

enum UserAPI {
  GetUserInfo = '/user/get'
}

export async function getUserInfo(uid: string) {
  return Request.post<MixinTwitterRes<UserInfo>>({
    url: UserAPI.GetUserInfo,
    showLoading: false,
    data: {
      uid: uid
    }
  })
}

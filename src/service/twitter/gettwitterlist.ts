import Request from '..'
import { MixinTwitterRes } from '../types'

export interface TwitterList {
  list?: List[]
  pre_page_token?: string
}

export interface List {
  ID?: number
  CreatedAt?: Date
  UpdatedAt?: Date
  DeletedAt?: null
  uid?: string
  user_name?: string
  content?: string
  user_avatar?: string
  praise_num?: number
}

export enum TwitterAPI {
  GetTwitterList = '/twitter/list',
  CreateTwitter = '/twitter/create',
  DeleteTwitter = '/twitter/delete'
}

export async function getTwitterList(page_token?: string) {
  let requrl: string = TwitterAPI.GetTwitterList
  if (page_token) {
    requrl += '?page_token=' + page_token
  }
  return Request.get<MixinTwitterRes<TwitterList>>({
    url: requrl,
    showLoading: false
  })
}

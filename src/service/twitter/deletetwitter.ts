import Request from '..'
import { MixinTwitterRes } from '../types'
import { TwitterAPI } from './gettwitterlist'

export async function deleteTwitter(id?: number) {
  return Request.delete<MixinTwitterRes>({
    url: TwitterAPI.DeleteTwitter,
    showLoading: false,
    data: {
      id: id
    }
  })
}

import Request from '..'
import { MixinTwitterRes } from '../types'
import { PraiseTwitter } from './createpraisetwitter'

export async function checkPraiseTwitter(uid: string, tid: number) {
  return Request.post<MixinTwitterRes<any>>({
    url: PraiseTwitter.CheckPraiseTwitter,
    showLoading: false,
    data: {
      tid: tid,
      uid: uid
    }
  })
}

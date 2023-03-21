import Request from '..'
import { MixinTwitterRes } from '../types'
import { PraiseTwitter } from './createpraisetwitter'

export async function deletePraiseTwitter(tid: string, from_uuid: string | undefined) {
  return Request.delete<MixinTwitterRes<any>>({
    url: PraiseTwitter.DeletePraiseTwitter,
    showLoading: false,
    data: {
      tid: tid,
      from_uuid: from_uuid
    }
  })
}

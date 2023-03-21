import Request from '..'
import { MixinTwitterRes } from '../types'

export enum PraiseTwitter {
  CreatePraiseTwitter = '/praisetwitter/create',
  DeletePraiseTwitter = '/praisetwitter/delete',
  CheckPraiseTwitter = '/praisetwitter/check'
}

export async function createPraiseTwitter(
  tid: string,
  to_uuid: string,
  from_uuid: string | undefined
) {
  return Request.post<MixinTwitterRes<any>>({
    url: PraiseTwitter.CreatePraiseTwitter,
    showLoading: false,
    data: {
      tid: tid,
      to_uuid: to_uuid,
      from_uuid: from_uuid
    }
  })
}

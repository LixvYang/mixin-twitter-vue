import { List } from '@/service/twitter/gettwitterlist'

export interface IMainState {
  twitterList: List[]
  pageToken: string
}

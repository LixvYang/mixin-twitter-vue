import { IMainState } from './main/types'
import { IUserState } from './user/types'
import { IPraiseTwitterState } from './praise-twitter/types'
import { ITwitterCommentState } from './twitter-comment/types'
export interface IRootState {
  [x: string]: any
}

export interface IRootWithModule {
  main: IMainState
  user: IUserState
  praisetwitter: IPraiseTwitterState
  twittercomment: ITwitterCommentState
}

export type IStoreType = IRootState & IRootWithModule

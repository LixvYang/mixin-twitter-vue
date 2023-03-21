import {
  listTwitterComment,
  List,
  TwitterCommentList
} from '@/service/twitter-comment/listwtittercomment'
import { MixinTwitterRes } from '@/service/types'

import { Module } from 'vuex'
import { IRootState } from '../types'
import { ITwitterCommentState } from './types'

const praiseTwitterModule: Module<ITwitterCommentState, IRootState> = {
  namespaced: true,
  state() {
    return {
      TwitterCommentList: []
    }
  },
  actions: {
    async handleShowTwitterCommentClick({ commit }, payload: any) {
      const twitterListRes: MixinTwitterRes<TwitterCommentList> = await listTwitterComment(payload)
      commit('changeTwitterCommentList', twitterListRes.data.list)
    }
  },
  mutations: {
    changeTwitterCommentList(state, list: List[]) {
      state.TwitterCommentList = list
    }
  },
  getters: {}
}

export default praiseTwitterModule

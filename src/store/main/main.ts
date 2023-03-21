import { getTwitterList, List, TwitterList } from '@/service/twitter/gettwitterlist'
import { MixinTwitterRes } from '@/service/types'
import { Module } from 'vuex'
import { IRootState } from '../types'
import { IMainState } from './types'

const mainModule: Module<IMainState, IRootState> = {
  namespaced: true,
  state() {
    return {
      twitterList: [],
      pageToken: ''
    }
  },
  actions: {
    async handleTwitterList({ commit }, payload: string) {
      const twitterListRes: MixinTwitterRes<TwitterList> = await getTwitterList(payload)
      commit('appendTwitterList', twitterListRes.data.list)
      commit('changePageToken', twitterListRes.data.pre_page_token)
    }
  },
  mutations: {
    changeTwitterList(state, twitterList: List[]) {
      state.twitterList = twitterList
    },
    changePageToken(state, pageToken: string) {
      state.pageToken = pageToken
    },
    appendTwitterList(state, twitterList: List[]) {
      for (const twitter of twitterList) {
        state.twitterList.push(twitter)
      }
    }
  },
  getters: {}
}

export default mainModule

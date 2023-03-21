import { getTwitterList, List, TwitterList } from '@/service/twitter/gettwitterlist'
import { MixinTwitterRes } from '@/service/types'
import { Module } from 'vuex'
import { IRootState } from '../types'
import { IPraiseTwitterState } from './types'
import { createPraiseTwitter } from '@/service/praise-twitter/createpraisetwitter'

const praiseTwitterModule: Module<IPraiseTwitterState, IRootState> = {
  namespaced: true,
  state() {
    return {}
  },
  actions: {
    async handleCreatePraisetwiiter({ commit }, payload: any) {
      const { tid, from_uuid, to_uuid } = payload
      const praisetwitterRes: MixinTwitterRes = await createPraiseTwitter(tid, to_uuid, from_uuid)
    }
  },
  mutations: {},
  getters: {}
}

export default praiseTwitterModule

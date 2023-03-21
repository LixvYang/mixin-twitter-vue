import { MixinTwitterRes } from '@/service/types'
import { getUserInfo, UserInfo } from '@/service/user/getuserinfo'
import { Module } from 'vuex'
import { IRootState } from '../types'
import { IUserState } from './types'

const userModule: Module<IUserState, IRootState> = {
  namespaced: true,
  state() {
    return {
      UserInfo: {}
    }
  },
  actions: {
    async handleUserInfo({ commit }, payload: string) {
      const userInfoRes: any = await getUserInfo(payload)
      commit('changeUserInfo', userInfoRes.data)
    },
    async handleMixinOauth({ commit }, payload: string) {
      const CLIENT_ID = `30aad5a5-e5f3-4824-9409-c2ff4152724e`
      const SCOPE = `PROFILE:READ`
      const RETURN_TO = `http://localhost:3000/api/v1/oauth/redirect`
      window.location.href = `https://mixin.one/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}&response_type=code&return_to=${RETURN_TO}`
    }
  },
  mutations: {
    changeUserInfo(state, userInfo: UserInfo) {
      state.UserInfo = userInfo
    }
  },
  getters: {}
}

export default userModule

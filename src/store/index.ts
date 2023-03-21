import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import main from './main/main'
import user from './user/user'
import praisetwiiter from './praise-twitter/praise-twitter'
import twittercomment from './twitter-comment/twitter-comment'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'lixin'
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    user,
    main,
    praisetwiiter,
    twittercomment
  }
})

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store

<template>
  <div class="main">
    <nav-bar />
    <van-divider />
    <van-list
      v-model:loading="loading"
      :finished="loadingFinished"
      finished-text="没有更多了"
      @load="loadingTwitter"
    >
      <template v-for="twitter in twitterList" :key="twitter">
        <TwitterItem
          class="twitter-item"
          :twitter="twitter"
          @handleTwitterItemClick="handleTwitterItemClick"
          @handleCommentClick="handleCommentClick"
        />
      </template>
    </van-list>

    <van-back-top />

    <van-popup
      round
      v-model:show="isShowTwitterContent"
      :style="{ padding: '64px' }"
      @click-close-icon="handlePopupCloseClick"
      >{{ twitterContent }}</van-popup
    >

    <comment-list
      :tid="tid"
      :isShowTwitterComment="isShowTwitterComment"
      @changeIsShowTwitterComment="changeIsShowTwitterComment"
    />
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, ref } from 'vue'
import TwitterItem from '@/components/twitter-item/index'
import NavBar from '@/components/nav-bar/index'
import CommentList from '@/components/comment-list'
import localCache from '@/utils/cache/cache'

export default defineComponent({
  components: {
    TwitterItem,
    NavBar,
    CommentList
  },
  setup() {
    const store = useStore()
    const isShowTwitterComment = ref<boolean>(false)
    const isShowTwitterContent = ref<boolean>(false)
    const twitterContent = ref<string>('')
    const tid = ref(0)

    const changeIsShowTwitterComment = (payload: boolean) => {
      isShowTwitterComment.value = payload
    }
    const handleTwitterItemClick = (twitterItemContent: string) => {
      isShowTwitterContent.value = true
      twitterContent.value = twitterItemContent
    }
    const handlePopupCloseClick = () => {
      twitterContent.value = ''
      isShowTwitterContent.value = false
    }

    const handleCommentClick = (t: number) => {
      isShowTwitterComment.value = true
      tid.value = t
      store.dispatch('twittercomment/handleShowTwitterCommentClick', String(t))
    }

    const prePageToken = computed(() => store.state.main.pageToken)
    const twitterList = computed(() => store.state.main.twitterList)
    store.dispatch('main/handleTwitterList', prePageToken.value)
    //
    if (localCache.getCache('_mixin_twitter')) {
      store.dispatch('user/handleUserInfo')
    }

    const list = ref<number[]>([])
    const loading = ref(false)
    const loadingFinished = ref(false)

    const loadingTwitter = () => {
      setTimeout(() => {
        // loading data
        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1111)
        }
        if (prePageToken.value !== '') {
          store.dispatch('main/handleTwitterList', prePageToken.value)
        }
        // 加载状态结束
        loading.value = false

        // 数据全部加载完成
        if (prePageToken.value === '') {
          loadingFinished.value = true
        }
      }, 1000)
    }

    return {
      changeIsShowTwitterComment,
      isShowTwitterComment,
      isShowTwitterContent,
      twitterContent,
      handleTwitterItemClick,
      handlePopupCloseClick,
      twitterList,
      list,
      loadingTwitter,
      loading,
      loadingFinished,
      handleCommentClick,
      tid
    }
  }
})
</script>

<style scoped>
.main {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.twitter-item {
  display: flex;
  position: relative;
  width: 96%;
  left: 2%;
  height: 7rem;
  margin-top: 0.5rem;
}

.nav-bar {
  position: relative;
  border-radius: 2rem;
  background-color: rgb(230, 228, 228);
  height: 4rem;
}
</style>

<template>
  <div class="comment-list">
    <van-popup
      round
      v-model:show="isShow"
      position="bottom"
      :style="{ height: '60%' }"
      @click-overlay="handlePopupCloseClick"
    >
      <template v-for="comment in commentList" :key="comment">
        <comment-item :comment="comment" />
      </template>
      <van-field class="comment-input" v-model="commentValue" label="评论">
        <template #button>
          <van-button size="small" type="primary" @click="handleCommentClick">确定</van-button>
        </template>
      </van-field>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { createTwitterComment } from '@/service/twitter-comment/createtwittercomment'
import { useStore } from '@/store'
import { defineComponent, watch, ref, computed } from 'vue'
import CommentItem from '../src/comment-item.vue'
import { showToast } from 'vant'

export default defineComponent({
  components: {
    CommentItem
  },
  props: {
    isShowTwitterComment: {
      type: Boolean,
      require: true
    },
    tid: {
      type: Number,
      require: true
    }
  },
  emits: ['changeIsShowTwitterComment'],
  setup(props, { emit }) {
    const store = useStore()
    const commentValue = ref('')
    const userInfo = computed(() => store.state.user.UserInfo)
    const commentList = computed(() => store.state.twittercomment.TwitterCommentList)
    let isShow = ref<boolean>(false)
    watch(
      () => props.isShowTwitterComment,
      (newValue: any, oldValue: any) => {
        isShow.value = newValue
      }
    )
    const handlePopupCloseClick = () => {
      emit('changeIsShowTwitterComment', false)
    }
    const handleCommentClick = async () => {
      if (!userInfo.value.uid) {
        showToast('请先登陆')
        return
      }
      const res = await createTwitterComment(
        props.tid!,
        commentValue.value,
        userInfo.value.uid!,
        userInfo.value.user_name!,
        userInfo.value.avatar_url!
      )
      if (res.code === 200) {
        showToast('Success')
        commentValue.value = ''
        setTimeout(() => {
          store.dispatch('twittercomment/handleShowTwitterCommentClick', String(props.tid))
        }, 1000)
      } else {
        showToast('Failed')
      }
    }
    return {
      isShow,
      commentList,
      handlePopupCloseClick,
      commentValue,
      handleCommentClick
    }
  }
})
</script>

<style scoped>
.comment-input {
  position: inherit;
  bottom: 0%;
}
</style>

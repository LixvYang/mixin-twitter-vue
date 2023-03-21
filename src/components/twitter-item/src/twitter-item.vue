<template>
  <div class="twitter-item">
    <van-image class="user-avatar" :src="twitter?.user_avatar" position="left" round lazy-load />
    <p class="user-name">{{ twitter?.user_name }}</p>
    <van-icon
      v-if="userInfo.uid && userInfo.uid === twitter?.uid"
      name="delete-o"
      class="delete-icon"
      color="#EE0A24"
      size="1.6rem"
      @click="isShow = true"
    />
    <span class="twitter-content" @click="handleContentClick">{{ twitter?.content }}</span>
    <van-icon
      name="gold-coin-o"
      class="reward"
      color="#FAAB0C"
      size="1.6rem"
      @click="handleRewardClick"
    />
    <van-icon
      name="comment-o"
      class="comment"
      color="#1989fa"
      size="1.6rem"
      @click="handleCommentClick"
    />
    <van-icon :name="isLike" class="like" color="#EE0A24" size="1.6rem" @click="handleLikeClick" />

    <van-popup v-model:show="isShow" round :style="{ padding: '3rem' }">
      你确定要删除吗?
      <div class="delete-btn">
        <van-button @click="isShow = false" type="primary">取消</van-button>
        <van-button @click="handleDeleteClick(twitter?.ID)" type="danger">确定</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, ref } from 'vue'
import { createPraiseTwitter } from '@/service/praise-twitter/createpraisetwitter'
import { deletePraiseTwitter } from '@/service/praise-twitter/deletepraisetwitter'
import { checkPraiseTwitter } from '@/service/praise-twitter/checkpraisetwitter'
import { MixinTwitterRes } from '@/service/types'
import { showToast } from 'vant'
import { deleteTwitter } from '@/service/twitter/deletetwitter'

export default defineComponent({
  props: {
    twitter: {
      type: Object,
      require: true
    }
  },
  emits: ['handleTwitterItemClick', 'handleCommentClick'],
  setup(props, { emit }) {
    const store = useStore()
    const userInfo = computed(() => store.state.user.UserInfo)
    const isLike = ref('like-o')
    const isShow = ref(false)

    const checkIfPraiseTwitter = async () => {
      if (!userInfo.value.uid) {
        return
      }

      const res: MixinTwitterRes = await checkPraiseTwitter(userInfo.value.uid, props.twitter?.ID)
      if (res.code === 200) {
        isLike.value = 'like'
      }
    }
    checkIfPraiseTwitter()

    const handleLikeClick = async () => {
      // no like
      if (!userInfo.value.uid) {
        showToast('请先登陆')
        return
      }

      if (isLike.value === 'like-o') {
        const res: MixinTwitterRes<any> = await createPraiseTwitter(
          props.twitter?.ID,
          props.twitter?.uid,
          userInfo.value.uid
        )

        if (res.code === 200) {
          isLike.value = 'like'
        } else {
          showToast('Praise Failed!!')
        }
      } else {
        // unlike
        const res: MixinTwitterRes<any> = await deletePraiseTwitter(
          props.twitter?.ID,
          userInfo.value.uid
        )
        if (res.code === 200) {
          isLike.value = 'like-o'
        } else {
          showToast('Unpraise Failed!!')
        }
      }
    }
    const handleContentClick = () => {
      emit('handleTwitterItemClick', props.twitter?.content)
    }
    const handleCommentClick = () => {
      emit('handleCommentClick', props.twitter?.ID)
    }
    const handleRewardClick = () => {
      if (!userInfo.value.uid) {
        showToast('请先登陆')
        return
      }
      if (!props.twitter?.uid) {
        showToast('Failed')
      }
      window.location.href = `mixin://transfer/${props.twitter?.uid}`
    }

    const handleDeleteClick = async (id: number) => {
      if (!userInfo.value.uid) {
        showToast('请先登陆')
        return
      }
      if (!props.twitter?.uid || userInfo.value.uid !== props.twitter?.tid) {
        showToast('Failed')
      }
      const res = await deleteTwitter(id)
      if (res.code === 200) {
        showToast('删除成功')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        showToast('删除失败')
      }
    }

    return {
      handleContentClick,
      isLike,
      handleLikeClick,
      handleCommentClick,
      handleRewardClick,
      handleDeleteClick,
      userInfo,
      isShow
    }
  }
})
</script>

<style scoped>
.twitter-item {
  position: relative;
  border-radius: 2rem;
  background-color: rgb(230, 228, 228);
}
.user-avatar {
  width: 3rem;
  height: 3rem;
  top: 15%;
  display: flex;
  left: 5%;
}
.reward {
  position: absolute;
  width: 1rem;
  height: 1rem;
  left: 20%;
  bottom: 15%;
}
.comment {
  position: absolute;
  width: 1rem;
  height: 1rem;
  left: 50%;
  bottom: 15%;
}
.like {
  position: absolute;
  width: 1rem;
  height: 1rem;
  left: 80%;
  bottom: 15%;
}
.user-name {
  position: absolute;
  top: 10%;
  left: 20%;
}
.twitter-content {
  position: absolute;
  top: 40%;
  left: 20%;
  height: 100%;
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.delete-icon {
  position: absolute;
  width: 1rem;
  height: 1rem;
  left: 80%;
  top: 15%;
}
.delete-btn {
  position: relative;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>

<template>
  <div class="twitter-form">
    <van-popup
      v-model:show="isShow"
      closeable
      round
      :style="popupStyle"
      @click-close-icon="handlePopupCloseClick"
      @click-overlay="handlePopupCloseClick"
    >
      <van-cell-group inset>
        <van-field
          v-model="twitterContent"
          rows="1"
          autosize
          label="Twitter"
          type="textarea"
          placeholder="请输入留言"
          label-align="top"
          show-word-limit
          maxlength="200"
        />
        <van-button class="create-twitter-btn" type="primary" @click="handleCreateClick"
          >创建</van-button
        >
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { createTwitter } from '@/service/twitter/createtwitter'
import { useStore } from '@/store'
import { showToast } from 'vant'

export default defineComponent({
  props: {
    isShowTwitter: {
      type: Boolean,
      default: false
    }
  },
  emits: ['changeIsShowTwitter'],
  setup(props, { emit }) {
    const store = useStore()
    const userInfo = computed(() => store.state.user.UserInfo)
    const isShow = ref<boolean>(false)
    const twitterContent = ref('')

    watch(
      () => props.isShowTwitter,
      (newValue: any, oldValue: any) => {
        isShow.value = newValue
      }
    )

    const handlePopupCloseClick = () => {
      emit('changeIsShowTwitter', false)
    }
    const handleCreateClick = async () => {
      if (!userInfo.value.uid) {
        showToast('Login first!')
        return
      }
      const res = await createTwitter(
        userInfo.value.uid,
        twitterContent.value,
        userInfo.value.user_name!,
        userInfo.value.avatar_url!
      )
      if (res.code === 200) {
        showToast('Succees!')
        handlePopupCloseClick()
        twitterContent.value = ''
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        showToast('Failed!')
      }
    }

    const popupStyle = { padding: '1rem', width: '80%', height: '50%' }
    return {
      isShow,
      popupStyle,
      twitterContent,
      handlePopupCloseClick,
      handleCreateClick
    }
  }
})
</script>

<style scoped lang="less">
.create-twitter-btn {
  position: absolute;
  bottom: 5%;
  right: 10%;
}
</style>

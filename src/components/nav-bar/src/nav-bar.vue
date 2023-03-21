<template>
  <div class="nav-bar">
    <van-image
      v-if="userInfo.uid"
      width="3rem"
      height="3rem"
      :src="userInfo?.avatar_url"
      position="left"
      round
      lazy-load
    />
    <van-button
      class="login-btn"
      v-if="!userInfo.uid"
      round
      color="linear-gradient(to right, #5F9EA0, #87CEEB)"
      @click="handleLoginClick"
    >
      登陆
    </van-button>

    <van-button
      v-if="userInfo.uid"
      class="create-twitter-btn"
      @click="handleCreateTwitter"
      round
      color="linear-gradient(to right, #00FFFF, #00BFFF)"
      >发布</van-button
    >

    <twitter-form :isShowTwitter="isShowTwitter" @changeIsShowTwitter="changeIsShowTwitter" />
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, ref } from 'vue'
import TwitterForm from '@/components/twitter-form'

export default defineComponent({
  components: {
    TwitterForm
  },
  setup() {
    const store = useStore()
    const userInfo = computed(() => store.state.user.UserInfo)
    const isShowTwitter = ref<boolean>(false)

    const changeIsShowTwitter = (payload: boolean) => {
      isShowTwitter.value = payload
    }

    const handleLoginClick = () => {
      store.dispatch('user/handleMixinOauth')
    }

    const handleCreateTwitter = () => {
      isShowTwitter.value = true
    }

    return {
      userInfo,
      isShowTwitter,
      changeIsShowTwitter,
      handleLoginClick,
      handleCreateTwitter
    }
  }
})
</script>

<style scoped>
.nav-bar {
  position: absolute;
  display: flex;
  top: 1rem;
  left: 5%;
  width: 90%;
}
.van-image {
  left: 1rem;
  top: 0.5rem;
}
.login-btn {
  position: absolute;
  top: 15%;
  left: 5%;
}
.create-twitter-btn {
  position: absolute;
  top: 15%;
  right: 5%;
}
</style>

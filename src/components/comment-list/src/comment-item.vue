<template>
  <div class="comment-item">
    <van-image class="from-user-avatar" :src="comment?.from_user_avatar" round lazy-load />
    <span class="from-user-name">{{ comment?.from_user_name }}</span>
    <span class="content">{{ comment?.content }}</span>
    <span class="created-at">{{ comment?.CreatedAt.substr(0, 10) }}</span>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    comment: {
      type: Object,
      require: false
    }
  },
  setup(props, { emit }) {
    const store = useStore()

    return {}
  }
})
</script>

<style scoped lang="less">
.comment-item {
  position: relative;
  padding: 1rem;
}
.from-user-avatar {
  width: 3rem;
  height: 3rem;
  top: 15%;
  display: flex;
  left: 5%;
}
.from-user-name {
  position: absolute;
  top: 25%;
  left: 25%;
}
.content {
  position: absolute;
  top: 50%;
  left: 25%;
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.created-at {
  position: absolute;
  top: 25%;
  right: 10%;
}
</style>

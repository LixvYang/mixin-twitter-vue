<template>
  <div class="app">
    <Main />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Main from '@/views/main/main.vue'

export default defineComponent({
  name: 'App',
  components: {
    Main
  },
  setup() {
    return { Main }
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>

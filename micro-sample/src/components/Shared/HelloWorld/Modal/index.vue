<template>
  <a-modal :visible="visible" @cancel="$emit('close')">
    <div>
      <img :src="getSrc()">
    </div>
    <div>
      <span class="text">sample</span>
      <a-button @click="onRequest">请求</a-button>
    </div>
  </a-modal>
</template>

<script>
import { getMenu } from '@/api/auth'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    getSrc () {
      return require('@/assets/logo.png')
    },
    async onRequest () {
      let data = await getMenu()
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
  .text{
    color: #1890ff;
  }
</style>

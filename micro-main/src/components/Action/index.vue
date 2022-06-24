<template>
  <div class="action-container">
    <a-icon class="action-icon" type="poweroff" title="退出登录" v-if="needToLogin"></a-icon>
    <hello-world></hello-world>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data () {
    return {
      needToLogin: window.custom.needToLogin
    }
  },
  created () {
    Vue.component('HelloWorld', async () => {
      const app = window.micro.apps.filter(app => app.name === 'micro-sample')[0]
      const component = await window.micro.getSharedComponent(app, 'HelloWorld')
      return component
    })
  },
  beforeDestroy () {
    const app = window.micro.apps.filter(app => app.name === 'micro-sample')[0]
    window.micro.unmountSharedApp(app, 'HelloWorld')
  }
}
</script>

<style lang="less" scoped>
  .action-container{
    height: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 0 8px;
    .action-icon{
      font-size: 22px;
      cursor: pointer;
      display: flex;
      height: 100%;
      align-items: center;
      padding: 0 12px;
    }
    .action-icon:hover{
      background: rgba(0,0,0,.025);
    }
  }
</style>

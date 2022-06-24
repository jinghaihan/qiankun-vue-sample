<template>
  <div class="shared-container">
    <a-spin v-show="loading"></a-spin>
    <component v-show="!loading" ref="component" v-bind:is="componentName"></component>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'SharedContainer',
  props: {
    app: {
      type: String,
      required: true
    },
    component: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      componentName: this.app + '-' + this.component
    }
  },
  created () {
    Vue.component(this.componentName, async () => {
      const app = window.micro.apps.filter(app => app.name === this.app)[0]
      const component = await window.micro.getSharedComponent(app, this.component)
      this.loading = false

      return component
    })
  },
  beforeDestroy () {
    const app = window.micro.apps.filter(app => app.name === this.app)[0]
    window.micro.unmountSharedApp(app, this.component)
  },
  methods: {
    onResize () {
      if (this.loading) return
      switch (this.type) {
        case 'chart':
          this.$refs.component.onResize()
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .shared-container{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

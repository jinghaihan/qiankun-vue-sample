<template>
  <div class="container">
    <grid-layout></grid-layout>
  </div>
</template>

<script>
import gridLayout from '@/components/GridLayout'

export default {
  name: 'home',
  components: { gridLayout }
}
</script>

<style lang="less" scoped>
  .container{
    background: #fff;
  }
</style>

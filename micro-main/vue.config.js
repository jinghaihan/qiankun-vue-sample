const path = require('path')
var webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const staticResource = {
  externals: {
    'vue': 'Vue',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter',
    'jquery': '$',
    'lodash': '_',
    'axios': 'axios',
    'vue-ls': 'VueStorage',
    'moment': 'moment',
    'ant-design-vue': 'antd'
  },
  css: [
    {
      src: '/static-resource/ant-design-vue@1.7.5/dist/antd.min.css',
      attr: ''
    }
  ],
  js: [
    {
      src: '/static-resource/vue@2.6.11/dist/vue.min.js',
      attr: ''
    },
    {
      src: '/static-resource/vuex@3.6.2/dist/vuex.min.js',
      attr: ''
    },
    {
      src: '/static-resource/vue-router@3.5.2/dist/vue-router.min.js',
      attr: ''
    },
    {
      src: '/static-resource/jquery@3.6.0/dist/jquery.min.js',
      attr: ''
    },
    {
      src: '/static-resource/lodash@4.17.21/lodash.min.js',
      attr: ''
    },
    {
      src: '/static-resource/axios@0.21.4/dist/axios.min.js',
      attr: ''
    },
    {
      src: '/static-resource/vue-ls@3.2.2/dist/vue-ls.min.js',
      attr: ''
    },
    {
      src: '/static-resource/moment@2.21.0/min/moment.min.js',
      attr: ''
    },
    {
      src: '/static-resource/moment@2.21.0/locale/zh-cn.js',
      attr: ''
    },
    {
      src: '/static-resource/ant-design-vue@1.7.5/dist/antd.min.js',
      attr: ''
    },
    {
      src: '/static-resource/ant-design-vue@1.7.5/dist/antd-with-locales.min.js',
      attr: ''
    }
  ]
}

// vue.config.js
module.exports = {
  publicPath: '/',

  transpileDependencies: ['resize-detector', 'ant-design-vue'],

  configureWebpack: config => {
    // config.plugins = [
    //   new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     _: 'lodash',
    //     'moment': 'moment'
    //   })
    // ]
    config.externals = staticResource.externals
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('public', resolve('public'))
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@utils', resolve('src/utils'))
      .set('@views', resolve('src/views'))
    config.plugin('html').tap(args => {
      args[0].static = staticResource
      return args
    })
  },

  devServer: {
    open: true,
    inline: true, // 打开热更新
    proxy: {
      '/static-resource': {
        target: 'http://101.43.154.197:9000/',
        ws: false,
        changeOrigin: true
      }
    }
  }
}

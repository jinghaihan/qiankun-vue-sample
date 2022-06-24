import { addGlobalUncaughtErrorHandler, start } from 'qiankun'

// 添加全局异常处理器
addGlobalUncaughtErrorHandler((event) => {
  // console.error(event)
  const { message: msg } = event
  // 加载失败时提示
  if (msg && msg.includes('died in status LOADING_SOURCE_CODE')) {
    console.log('子应用加载失败，请检查应用是否可运行')
  }
})

// 导出 qiankun 的启动函数
export default start

// 使用 NODE_ENV 区分不同环境，默认值为 development
const ENV = process.env.NODE_ENV || 'development'
const config = window.app[ENV]

let apps = []
// 动态生成微应用基本信息
Object.keys(config).forEach(app => {
  let arr = app.split('_')
  // 获取微应用后缀名
  let name = 'micro-' + arr[arr.length - 1].toLowerCase()
  apps.push({
    // name: 微应用名称 - 具有唯一性，为了方便区分，采取和微应用名称
    // entry: 微应用入口 - 通过该地址加载微应用，根据部署模式采取绝对路径或相对路径
    // container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
    // activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
    name: name,
    entry: config[app],
    container: '#' + name,
    activeRule: '/' + name + '/'
  })
})
export default apps

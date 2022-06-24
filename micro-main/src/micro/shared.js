import _ from 'lodash'

let sharedComponents = {}
let microAppsUsed = {}
let loadedApps = {}

/**
 * 初始化存储空间以及变化监听
 * @param {apps}
 * @param {loadMicroApp}
 * @returns {null}
 */
export function initShared (apps, loadMicroApp) {
  window.micro = {
    apps,
    loadMicroApp,
    setSharedComponent,
    getSharedComponent,
    unmountSharedApp
  }

  // 共享组件
  Object.defineProperty(window.micro, 'sharedComponents', {
    get: function () {
      return sharedComponents
    },
    set: function (value) {
      sharedComponents = value
      // console.log('sharedComponents Change Callback')
    }
  })

  // 共享组件使用计数
  Object.defineProperty(window.micro, 'microAppsUsed', {
    get: function () {
      return microAppsUsed
    },
    set: function (value) {
      microAppsUsed = value
      // console.log('microAppsUsed Change Callback')
    }
  })

  // 已加载子应用
  Object.defineProperty(window.micro, 'loadedApps', {
    get: function () {
      return loadedApps
    },
    set: function (value) {
      loadedApps = value
      // console.log('loadedApps Change Callback')
    }
  })

  // 设置子应用依赖使用计数
  apps.forEach(app => {
    window.micro.microAppsUsed[app.name] = 0
  })

  // 创建隐藏容器
  let body = document.querySelector('body')
  let container = document.createElement('div')
  container.setAttribute('id', 'micro-shared-container')
  container.setAttribute('style', 'display: none')
  body.append(container)

  // 创建子应用容器
  apps.forEach(app => {
    let microContainer = document.createElement('div')
    microContainer.setAttribute('id', app.name + '-shared-container')
    container.append(microContainer)
  })
}

/**
 * mount指定子应用
 * @param {apps}
 * @returns {null}
 */
export async function loadApp (app) {
  let { loadMicroApp } = window.micro

  let microApp = loadMicroApp({
    name: app.name,
    entry: app.entry, 
    container: '#' + app.name + '-shared-container',
    props: { data: { ignoreRender: true } }
  })
  let data = {}
  data[app.name] = microApp
  let loadedApps = Object.assign(window.micro.loadedApps, data)
  window.micro.loadedApps = _.cloneDeep(loadedApps)

  await microApp.mountPromise
}

/**
 * unmount指定子应用
 * @param {app}
 * @returns {null}
 */
export async function unmountSharedApp (app) {
  window.micro.microAppsUsed[app.name] -= 1
  if (window.micro.microAppsUsed[app.name]) return

  let { loadedApps } = window.micro
  let microApp = loadedApps[app.name]

  if (microApp.getStatus() === 'MOUNTED') {
    await microApp.unmount()
  }
}

/**
 * 获取子应用的共享组件
 * @param {app}
 * @param {name}
 * @returns {component}
 */
export async function getSharedComponent (app, name) {
  let microApp = window.micro.loadedApps[app.name]
  window.micro.microAppsUsed[app.name] += 1

  if (microApp) {
    // 如果该微应用已经被加载过
    if (microApp.getStatus() === 'NOT_MOUNTED') {
      await microApp.mount()
    } else {
      return new Promise((resolve, reject) => {
        microApp.mountPromise.then(() => {
          resolve(window.micro.sharedComponents[app.name][name])
        })
      })
    }
  } else {
    await loadApp(app)
  }

  // microApp.unmount()
  return window.micro.sharedComponents[app.name][name]
}

/**
 * 将当前项目的共享组件注册到 micro.sharedComponents 中
 * @param {appName}
 * @param {components}
 * @returns {null}
 */
export function setSharedComponent (appName, components) {
  let sharedComponents = {}
  sharedComponents[appName] = {}

  // 获取shared中入口文件注册的所有共享组件
  Object.keys(components).forEach(name => {
    sharedComponents[appName][name] = components[name]
  })
  sharedComponents = Object.assign(window.micro.sharedComponents, sharedComponents)
  window.micro.sharedComponents = _.cloneDeep(sharedComponents)
}

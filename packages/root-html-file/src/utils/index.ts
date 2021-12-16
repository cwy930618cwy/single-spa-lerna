import 'systemjs'

/**
 * hash匹配模式
 * @param app 应用配置
 */
export function hashPrefix (app: AppConfig) {
  return function (location: Location) {
    if (!app.path) return true

    if (Array.isArray(app.path)) {
      if (app.path.some(path => location.hash.startsWith(`#${path}`))) {
        return true
      }
    } else if (location.hash.startsWith(`#${app.path}`)) {
      return true
    }

    return false
  }
}

/**
 * 普通路径匹配模式
 * @param app 应用配置
 */
export function pathPrefix (app: AppConfig) {
  return function (location: Location) {
    if (!app.path) return true

    if (Array.isArray(app.path)) {
      if (app.path.some(path => location.pathname.startsWith(path))) {
        return true
      }
    } else if (location.pathname.startsWith(app.path)) {
      return true
    }

    return false
  }
}

/**
 * 注册应用
 * @param spa
 * @param app
 */
export async function registerApp (spa: any, app: AppConfig) {
  const activityFunc = app.hash ? hashPrefix(app) : pathPrefix(app)

  console.log('app=-----', app)

  spa.registerApplication(
    app.name,
    () => System.import(app.main),
    app.base ? (() => true) : activityFunc
  )
}
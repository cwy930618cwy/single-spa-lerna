import { setPublicPath } from 'systemjs-webpack-interop'

console.log('nimabi---', process.env.VUE_APP_NAME)

const appName = process.env.VUE_APP_NAME || ''

setPublicPath(appName, 2)

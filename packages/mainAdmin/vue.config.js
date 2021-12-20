/** @format */
const path = require('path')
// const argv = require('minimist')(process.argv.slice(2))
const StatsPlugin = require('stats-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const appName = process.env.VUE_APP_NAME
const port = process.env.port
// const basePath = argv['base-path'] || '/'

const baseUrl = process.env.VUE_APP_BASE_URL

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports =  {
  publicPath: isProduction ? `${baseUrl}${appName}/` : `http://localhost:${port}/`,

  // css在所有环境下，都不单独打包为文件。这样是为了保证最小引入（只引入js）
  css: {
      extract: false
  },

  productionSourceMap: false,

  outputDir: path.resolve(__dirname, `../../dist/${appName}`),

  lintOnSave: process.env.NODE_ENV === 'development',

  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },

  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: appName,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
  },

  // configureWebpack: config => {
  //   config.plugins.push(
  //     new StatsPlugin('manifest.json', {
  //       chunkModules: false,
  //       entrypoints: true,
  //       env: true,
  //       source: false,
  //       chunks: false,
  //       modules: false,
  //       assets: false,
  //       children: false,
  //       exclude: [/node_modules/]
  //   }),
  //   )
  // },

  chainWebpack: config => {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )

    config.output.library(appName).libraryTarget('umd')

    config.externals(['vue', 'vue-router', 'vuex'])  // 一定要引否则说没有注册

    if (isProduction) {
      // 打包目标文件加上 hash 字符串，禁止浏览器缓存
      config.output.filename('js/index.[hash:8].js')
    }
  }
}
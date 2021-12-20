module.exports = (_, __, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.stories(\/index)?\.jsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
  })
  return defaultConfig
}
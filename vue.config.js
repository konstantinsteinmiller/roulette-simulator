const path = require('path')

module.exports = {
  chainWebpack: config => {
    /* ALIAS RESOLVING */
    config.resolve.alias.set('@', path.resolve('src/'))
    config.resolve.alias.set('=', path.resolve(__dirname))

    /* SVG LOADER */
    const svgRule = config.module.rule('svg')
    // clear all existing loaders. if you don't do this, the loader below will be appended to
    // existing loaders of the rule.
    svgRule.uses.clear()
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')
  },
}

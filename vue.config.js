module.exports = {
    publicPath: process.env.VUE_APP_BASE_ROUTE,
    configureWebpack: {
        mode: process.env.VUE_APP_MODE !== 'development' ? 'production' : 'development'
    }
  }
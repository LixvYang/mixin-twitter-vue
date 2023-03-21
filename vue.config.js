const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir: './dist',
  publicPath: './', // 注意 这里使用 /  如果不行的话  就 ./
  assetsDir: 'static',
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  // lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        component: '@/component'
      }
    }
  }
})

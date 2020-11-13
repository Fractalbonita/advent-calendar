module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080/',
  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import "@/assets/scss/_library.scss";
        `
      }
    }
  }
};

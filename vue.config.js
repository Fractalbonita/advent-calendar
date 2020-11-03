module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/assets/scss/_base.scss";
        @import "@/assets/scss/_library.scss";
        `
      }
    }
  }
};

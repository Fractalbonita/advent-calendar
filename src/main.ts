import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/base.css';

Vue.config.productionTip = false;

Vue.directive('scroll', {
  inserted: function(el, binding) {
    const f = function(evt: Event) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f);
      }
    };
    window.addEventListener('scroll', f);
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

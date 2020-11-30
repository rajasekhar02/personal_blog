import Vue from 'vue';
import VueVirtualScroller from 'vue-virtual-scroller';
import vueCustomElement from 'vue-custom-element';
import App from './App.vue';
import router from './router';
import '@/config/elementUi';
import store from './store/store';
import './registerServiceWorker';


Vue.use(VueVirtualScroller);
Vue.use(vueCustomElement);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

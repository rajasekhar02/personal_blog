import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "@/config/elementUi.js";
import store from './store/store'
import './registerServiceWorker'
import vueCustomElement from 'vue-custom-element'
import VueVirtualScroller from 'vue-virtual-scroller'

Vue.use(VueVirtualScroller)
Vue.use(vueCustomElement);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

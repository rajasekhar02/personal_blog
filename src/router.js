import Vue from 'vue';
import Router from 'vue-router';
import agGridDemo from '@/components/agGridDemo.vue';
import Home from './views/Home.vue';
import vScrollerDemo from './components/vScrollerDemo';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      alias: '/datepicker',
      name: 'datePicker',
      component: () => import(/* webpackChunkName: "about" */ './views/datePickerView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "about" */ './views/dashboard.vue'),
    },
    {
      path: '/vScroller',
      name: 'Virtual Scroller',
      component: vScrollerDemo,
    },
    {
      path: '/coin/:coin_id',
      name: "Coin Details",
      props:true,
      component: () => import(/* webpackChunkName: "about" */ './views/coinDetails.vue'),
    },
    {
      path: '/agGridDemo',
      name: 'Ag Grid',
      component: agGridDemo,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/dashboard.vue'),
    },
  ],
});

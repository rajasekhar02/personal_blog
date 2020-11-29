import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import vScrollerDemo from "./components/vScrollerDemo"
import agGridDemo from '@/components/agGridDemo.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      alias:'/dashboard',
      name: 'dashboard',
      component: ()=>import(/* webpackChunkName: "about" */ './views/dashboard.vue')
    },
    {
      path: '/vScroller',
      name: 'Virtual Scroller',
      component: vScrollerDemo
    },
    {
      path: '/agGridDemo',
      name: "Ag Grid",
      component: agGridDemo
    },
    {
      path: '/home',
      name: 'home',
      component: ()=>import(/* webpackChunkName: "about" */ './views/dashboard.vue')
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Schedule from '@/pages/Schedule'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/agenda',
      name: 'Schedule',
      component: Schedule
    }
  ]
})

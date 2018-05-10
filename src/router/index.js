import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Schedule from '@/pages/Schedule'
import Result from '@/pages/Result'
import WeekSimulation from '@/pages/WeekSimulation'

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
    },
    {
      path: '/resultado',
      name: 'Result',
      component: Result
    },
      path:'/evento',
      name: 'WeekSimulation',
      component: WeekSimulation
    },
  ]
})

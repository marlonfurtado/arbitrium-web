import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Schedule from '@/pages/Schedule'
import Result from '@/pages/Result'
import WeekSimulation from '@/pages/WeekSimulation'
import GameOver from '@/pages/GameOver'

Vue.use(Router)

if (process.env.API_SERVER)
  var apiServer = process.env.API_SERVER
else
  var apiServer = 'localhost'

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
    {
      path:'/evento',
      name: 'WeekSimulation',
      component: WeekSimulation
    },
    {
      path: '/fim',
      name: 'GameOver',
      component: GameOver
    },
    {
      path:'/relatorio',
      name: 'Report',
      component: WeekSimulation,
      /* beforeEnter function: called before the route that renders this component is confirmed.
         We used it in order to dont leave the page while downloading report through api call.
         reference: https://router.vuejs.org/guide/advanced/navigation-guards.html#per-route-guard
      */
      beforeEnter() {
        window.location = 'http://' + apiServer + ':3000'+'/report'
      }
    },
  ]
})

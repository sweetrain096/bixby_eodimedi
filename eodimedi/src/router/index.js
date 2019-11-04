import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import SelectHospitalSubject from '../views/SelectHospitalSubject.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail
  },
  {
    path: '/search/:type',
    name: 'search',
    component: Home
  },
  {
    path: '/subject',
    name: 'selecthospitalsubject',
    component: SelectHospitalSubject
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
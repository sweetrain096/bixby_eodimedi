import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue'
import Detail from '@/views/Detail.vue'
import About from '@/views/About.vue'
import SelectHospitalSubject from '@/views/SelectHospitalSubject.vue'



Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
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
            component: Detail,
            props: true
        },
        {
            path: '/search/:type',
            name: 'search',
            component: Home,
            props: true
        },
        {
            path: '/subject',
            name: 'selecthospitalsubject',
            component: SelectHospitalSubject
          },
    ]
})
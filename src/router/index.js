import Vue from 'vue'
import Router from 'vue-router'
import Infomation from '@/components/Infomation'
import BinaryLabeling from '@/components/BinaryLabeling'
import MultiLabeling from '@/components/MultiLabeling'
import Home from '@/pages/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'Infomation',
          component: Infomation
        },
        {
          path: '/binary',
          name: 'BinaryLabeling',
          component: BinaryLabeling
        },
        {
          path: '/multi',
          name: 'MultiLabeling',
          component: MultiLabeling
        }
      ]
    }
  ]
})

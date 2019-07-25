import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Header from '@/components/Header'
import Test from '@/components/Test'
import chart from '@/components/chart'
import copy from '@/components/copy'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
			path: '/header',
			name: 'header',
			component: Header
		},{
			path: '/Test',
			name: 'Test',
			component: Test
		},{
			path: '/chart',
			name: 'chart',
			component: chart
		},
		{
			path: '/copy',
			name: 'copy',
			component: copy
		}
		
  ]
})

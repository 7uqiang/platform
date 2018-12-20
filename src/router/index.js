import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import Login from '@/components/Login'
// 二级路由
import Common from '@/components/dianpu/Common'
import Category from '@/components/shangpin/Category'
import List from '@/components/shangpin/List'

import Addlist from '@/components/shangpin/Addlist'

Vue.use(Router)

export default new Router({
    routes:[
          {
          path: '/',
          redirect:'/Login'//重定向
        },
        {
          path:'/Login',
          name:'login',
          component:Login
        },
        {
            path:'/home',
            component:Home,
            name:'home',
            children:[{
                path:'/Category',
                name:'category',
                component:Category
            },{
                path:'/List',
                name:'list',
                component:List,
            },{
                path:'/Common',
                name:'common',
                component:Common
            }, {
                  path:'/List/Addlist',
                  name:'addlist',
                  component:Addlist,
            }]
        }
    ]
});



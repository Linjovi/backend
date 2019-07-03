import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import JWTable from '@/views/consumer/JWTable'
// import AddConsumer from '@/views/consumer/AddConsumer'
import JWForm from '@/views/activity/JWForm'
import Login from '@/views/Login'
import Message from '@/views/user/Message'
import Setting from '@/views/user/Setting'
import JWTranslate from '@/views/translate/JWTranslate'


Vue.use(Router)

// let router = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   }
// ]

export default new Router({
  mode:"history",
  routes : [
    {
      path: '/',
      name: 'Home',
      redirect: '/table',//设置默认指向的路径
      component: Home,
      children:[
        {path:'table',component:JWTable,name:"Table",
        // children:[
        //   {path:'add',component:AddConsumer,name:"AddConsumer"}
        // ]
        },
        {path:'form',component:JWForm,name:"Form"},
        {path:'translate',component:JWTranslate,name:"Translate"},
        {
          path:'/message',
          name:'Message',
          component:Message
        },
        {
          path:'/setting',
          name:'Setting',
          component:Setting
        }
    
      ]
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    }


  ]
})



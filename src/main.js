// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI, { TabPane } from 'element-ui';
import Mock from './mock'
import VueResource from 'vue-resource'

Mock.bootstrap();
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)

router.beforeEach((to, from, next) => {
  if(to.path == '/login'){
    sessionStorage.removeItem('user');
  }
  let user = sessionStorage.getItem('user');
  if(to.path != '/login' && !user){
    // console.log("before");
    // next();
    next({path:'/login'});
  }else{
    next();
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})



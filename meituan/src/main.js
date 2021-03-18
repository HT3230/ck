// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./assets/css/reset.css"
import "./assets/js/rem.js"

// 注册公共组件
import common from "./common/index"
for(let key in common){
  Vue.component(key,common[key])
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

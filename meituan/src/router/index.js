import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 一级
const login = () => import("../page/login")
const index = () => import("../page/index")
const movie = () => import("../page/movie")
const food = () => import("../page/food")
const moviedetail = () => import("../page/moviedetail")
const fooddetail = () => import("../page/fooddetail")
// 二级
const home = () => import("../components/home")
const order = () => import("../components/order")
const mine = () => import("../components/mine")

export default new Router({
  routes: [{
    path: "/login",
    component: login
  }, {
    path: "/index",
    component: index,
    children: [{
      path: "home",
      component: home
    }, {
      path: "order",
      component: order
    }, {
      path: "mine",
      component: mine
    }, {
      path: "",
      redirect: "home"
    }]
  }, {
    path: "/movie",
    component: movie
  }, {
    path: "/moviedetail",
    component: moviedetail
  }, {
    path: "/food",
    component: food
  }, {
    path: "/fooddetail",
    component: fooddetail
  }, {
    path: "*",
    redirect: "/login"
  }
  ]
})

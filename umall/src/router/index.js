import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index"

Vue.use(Router)
function changeEnter(path,next) {
  // 取出你能去的地址
  let routerUrl = store.state.userInfo.menus_url
  if(routerUrl.includes(path)){
    next()
  }else{
    next("/")
  }
}
export const indexRouter = [{
  path: "menu",
  component: () => import("../page/menu/menu"),
  name: "菜单管理",
  beforeEnter: (to, from, next) => {
    changeEnter("/menu",next)
  }
}, {
  path: "role",
  component: () => import("../page/role/role"),
  name: "角色管理",
  beforeEnter: (to, from, next) => {
    changeEnter("/role",next)
  }
}, {
  path: "manage",
  component: () => import("../page/manage/manage"),
  name: "管理员管理",
  beforeEnter: (to, from, next) => {
    changeEnter("/manage",next)
  }
}, {
  path: "cate",
  component: () => import("../page/cate/cate"),
  name: "商品分类",
  beforeEnter: (to, from, next) => {
    changeEnter("/cate",next)
  }
}, {
  path: "specs",
  component: () => import("../page/specs/specs"),
  name: "商品规格",
  beforeEnter: (to, from, next) => {
    changeEnter("/specs",next)
  }
}, {
  path: "goods",
  component: () => import("../page/goods/goods"),
  name: "商品管理",
  beforeEnter: (to, from, next) => {
    changeEnter("/goods",next)
  }
}, {
  path: "member",
  component: () => import("../page/member/member"),
  name: "会员管理",
  beforeEnter: (to, from, next) => {
    changeEnter("/member",next)
  }
}, {
  path: "banner",
  component: () => import("../page/banner/banner"),
  name: "轮播图管理",
  beforeEnter: (to, from, next) => {
    changeEnter("/banner",next)
  }
}, {
  path: "seckill",
  component: () => import("../page/seckill/seckill"),
  name: "秒杀活动",
  beforeEnter: (to, from, next) => {
    changeEnter("/seckill",next)
  }
}]
const router= new Router({
  routes: [
    {
      path: "/login",
      component: () => import("../page/login/login")
    },{
      path: "/",
      component: () => import("../page/index/index"),
      children: [{
        path: "",
        component: () => import("../page/home/home")
      },
      ...indexRouter
      ]
    }
  ]
})
// 登录拦截
// router.beforeEach((to, from, next) => {
//   // 1、如果去的是登录页，那么就直接进
//   if (to.path == "/login") {
//     next()
//     return
//   }
//   // 2、如果去的是其他页面，就验证仓库里面的token是否存在，如果存在表示已经登陆过了可以放行
//   if (store.state.userInfo.token) {
//     next()
//     return
//   }
//   next("/login")
// })


export default router

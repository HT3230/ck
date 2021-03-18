import axios from "axios"
import qs from "qs"
import Vue from "vue"
import store from "../store/index"

let baseUrl = "/api"
// 开发
Vue.prototype.$imgUrl ="http://localhost:3000/"
// 上线
// Vue.prototype.$imgUrl=''

// 请求拦截
axios.interceptors.request.use((req) => {
  console.log(req);
  // 判断是不是登录页，如果不是登录页的话就添加authorization这个字段。如果是登录的话就不用添加，因为登录之前是没有token的
  if (req.url != baseUrl + "/api/userlogin") {
    req.headers.authorization = store.state.userInfo.token
  }
  return req
})
// 响应
axios.interceptors.response.use((res)=>{
    console.group("=====本次请求的路径是："+res.config.url)
    console.log(res);
    console.groupEnd("=====请求结束")
  
    return res
  })
// 菜单管理
export const menuadd = (form)=>{
    return axios({
      url:baseUrl+"/api/menuadd",
      method:"post",
      data:qs.stringify(form)
    })
  }
  export const menuList = () => {
    return axios({
      url: baseUrl + "/api/menulist",
      method: "get",
      params: {
        istree: true
      }
    })
  }
  export const menuDel = (form) => {
    return axios({
      url: baseUrl + "/api/menudelete",
      method: "POST",
      data:qs.stringify(form)
    })
  }
  // 获取一条信息
  export const menuInfo = (id) => {
    return axios({
      url: baseUrl + "/api/menuInfo",
      method: "get",
      params:{
        id:id
      }
    })
  } 
  // 修改
  export const menuedit = (form) => {
    return axios({
      url: baseUrl + "/api/menuedit",
      method: "post",
      data:qs.stringify(form)
    })
  }
  // 角色管理
  export const roleAdd = (form) => {
    return axios({
      url: baseUrl + "/api/roleadd",
      method: "POST",
      data: qs.stringify(form)
    })
  }
  export const roleList = () => {
    return axios({
      url: baseUrl + "/api/rolelist",
      method: "get"
    })
  }
  // 删除
  export const roleDel = (form) => {
    return axios({
      url: baseUrl + "/api/roledelete",
      method: "POST",
      data: qs.stringify(form)
    })
  }
  // 获取一条信息
export const roleInfo = (id) => {
  return axios({
    url: baseUrl + "/api/roleinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
// 修改
export const roleedit = (form) => {
  return axios({
    url: baseUrl + "/api/roleedit",
    method: "post",
    data: qs.stringify(form)
  })
}
// 管理员

// 添加
export const manageadd = (form) => {
  return axios({
    url: baseUrl + "/api/useradd",
    method: "post",
    data: qs.stringify(form)
  })
}
// 列表
export const manageList = (form) => {
  return axios({
    url: baseUrl + "/api/userlist",
    method: "get",
    params: form
  })
}
// 删除
export const manageDel = (form) => {
  return axios({
    url: baseUrl + "/api/userdelete",
    method: "POST",
    data: qs.stringify(form)
  })
}
// 获取一条信息
export const manageInfo = (uid) => {
  return axios({
    url: baseUrl + "/api/userinfo",
    method: "get",
    params: {
      uid: uid
    }
  })
}
// 修改
export const manageedit = (form) => {
  return axios({
    url: baseUrl + "/api/useredit",
    method: "post",
    data: qs.stringify(form)
  })
}
// 总条数
export const manageTotal = () => {
  return axios({
    url: baseUrl + "/api/usercount",
    method: "get"
  })
}
//              商品分类
// 添加
export const cateadd = (form) => {
  // 因为form中包含了文件，所以必须要模拟form表单进行传参
  /* 
    form={
      pid:0,
      catename:"空调",
      img:文件,
      status:1
    }
      data.append("pid",0)
      data.append("catename","空调")
      data.append("img","文件")
      data.append("status",1)
  */
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    url: baseUrl + "/api/cateadd",
    method: "post",
    data: data
  })
}
// 列表
export const cateList = (form) => {
  return axios({
    url: baseUrl + "/api/catelist",
    method: "get",
    params: form
  })
}
// 删除
export const cateDel = (form) => {
  return axios({
    url: baseUrl + "/api/catedelete",
    method: "POST",
    data: qs.stringify(form)
  })
}
// 获取一条信息
export const cateInfo = (id) => {
  return axios({
    url: baseUrl + "/api/cateinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
// 修改
export const cateedit = (form) => {
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    url: baseUrl + "/api/cateedit",
    method: "post",
    data: data
  })
}
// ==========specs商品规格=============
// 添加
export const specsadd = (form) => {
  return axios({
    url: baseUrl + "/api/specsadd",
    method: "post",
    data: qs.stringify(form)
  })
}
// 列表
export const specsList = (form) => {
  return axios({
    url: baseUrl + "/api/specslist",
    method: "get",
    params: form
  })
}
// 删除
export const specsDel = (form) => {
  return axios({
    url: baseUrl + "/api/specsdelete",
    method: "POST",
    data: qs.stringify(form)
  })
}
// 获取一条信息
export const specsInfo = (id) => {
  return axios({
    url: baseUrl + "/api/specsinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
// 修改
export const specsedit = (form) => {
  return axios({
    url: baseUrl + "/api/specsedit",
    method: "post",
    data: qs.stringify(form)
  })
}
// 总条数
export const specsTotal = () => {
  return axios({
    url: baseUrl + "/api/specscount",
    method: "get"
  })
}
// ==========goods商品管理=============
// 添加
export const goodsadd = (form) => {
  // 因为涉及到了图片，所以使用模拟form表单
  let data = new FormData()
  for(let i in form){
    data.append(i,form[i])
  }
  return axios({
    url: baseUrl + "/api/goodsadd",
    method: "post",
    data: data
  })
}
// 列表
export const goodsList = (form) => {
  return axios({
    url: baseUrl + "/api/goodslist",
    method: "get",
    params: form
  })
}
// 删除
export const goodsDel = (form) => {
  return axios({
    url: baseUrl + "/api/goodsdelete",
    method: "POST",
    data: qs.stringify(form)
  })
}
// 获取一条信息
export const goodsInfo = (id) => {
  return axios({
    url: baseUrl + "/api/goodsinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
// 修改
export const goodsedit = (form) => {
  let data = new FormData()
  for(let i in form){
    data.append(i,form[i])
  }
  return axios({
    url: baseUrl + "/api/goodsedit",
    method: "post",
    data: data
  })
}
// 总条数
export const goodsTotal = () => {
  return axios({
    url: baseUrl + "/api/goodscount",
    method: "get"
  })
}
//               会员管理
// 列表
export const memberlist = (form) => {
  return axios({
    url: baseUrl + "/api/memberlist",
    method: "get",
    params: form
  })
}
// 获取一条信息
export const memberinfo = (uid) => {
  return axios({
    url: baseUrl + "/api/memberinfo",
    method: "get",
    params: {
      uid: uid
    }
  })
}
// 修改
export const memberedit = (form) => {
  return axios({
    url: baseUrl + "/api/memberedit",
    method: "post",
    data: qs.stringify(form)
  })
}
//          轮播图
// 添加
export const banneradd = (form) => {
  // 因为form中包含了文件，所以必须要模拟form表单进行传参
  /* 
    form={
      pid:0,
      catename:"空调",
      img:文件,
      status:1
    }
      data.append("pid",0)
      data.append("catename","空调")
      data.append("img","文件")
      data.append("status",1)
  */
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    url: baseUrl + "/api/banneradd",
    method: "post",
    data: data
  })
}
// 列表
export const bannerlist = (form) => {
  return axios({
    url: baseUrl + "/api/bannerlist",
    method: "get",
    params: form
  })
}
// 删除
export const bannerdelete = (form) => {
  return axios({
    url: baseUrl + "/api/bannerdelete",
    method: "POST",
    data: qs.stringify(form)
  })
}
// 获取一条信息
export const bannerinfo = (id) => {
  return axios({
    url: baseUrl + "/api/bannerinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
// 修改
export const banneredit = (form) => {
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    url: baseUrl + "/api/banneredit",
    method: "post",
    data: data
  })
}
// ==========秒杀活动=============
// 添加
export const seckadd = (form)=>{
  return axios({
    url:baseUrl+"/api/seckadd",
    method:"post",
    data:qs.stringify(form)
  })
}
// 列表
export const secklist = (form) => {
  return axios({
    url: baseUrl + "/api/secklist",
    method: "get",
    params: form
  })
}
// 删除
export const seckdelete = (form) => {
  return axios({
    url: baseUrl + "/api/seckdelete",
    method: "POST",
    data: qs.stringify(form)
  })
}
// 获取一条信息
export const seckinfo = (id) => {
  return axios({
    url: baseUrl + "/api/seckinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
// 修改
export const seckedit = (form) => {
  return axios({
    url: baseUrl + "/api/seckedit",
    method: "post",
    data:qs.stringify(form)
  })
}
// ==========login管理员登录=============
export const reqLogin = (form)=>{
  return axios({
    url: baseUrl + "/api/userlogin",
    method:"POST",
    data:qs.stringify(form)
  })
}
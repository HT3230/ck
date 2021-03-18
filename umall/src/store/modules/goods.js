import {
    goodsList,goodsTotal
  } from "../../utils/request"
  
  // 存放数据
  const state = {
    // 列表
    list: [],
    // 总条数
    total:0,
    // 每页显示的条数
    size:2,
    // 当前页码
    page:1
  }
  
  // 修改数据
  const mutations = {
    changeList(state, arr) {
      state.list = arr
    },
    // 修改总条数
    changeTotal(state,num){
      state.total = num
    },
    // 修改当前页码
    changePage(state,num){
      state.page = num
    }
  }
  
  // 请求
  const actions = {
    // 请求列表数据
    reqChangeList(context) {
      // size：请求的条数。   page：页码数
      goodsList({size:context.state.size,page:context.state.page}).then(res => {
        let list = res.data.list?res.data.list:[]
        // 原本请求的第2页数据，但是删除了两个之后，应该请求第一页的数据，但是page还是等于2，导致了请求的还是第2页的数据，所以返回了null。加判断如果list.length=0，那么就请求page-1页的数据
        if(list.length==0 && context.state.page > 1){
          context.commit('changePage',context.state.page-1)
          context.dispatch("reqChangeList")
        }
        context.commit('changeList',list)
      })
    },
    // 请求总条数
    reqChangeTotal(context){
      goodsTotal().then(res=>{
        context.commit('changeTotal',res.data.list[0].total)
      })
    },
    // 触发修改当前页码
    reqChangePage(context,num){
      context.commit('changePage',num)
    }
  }
  
  // 导出数据
  const getters = {
    // 列表数据
    list(state){
      return state.list
    },
    // 总条数total
    total(state){
      return state.total
    },
    // 每页显示的条数size
    size(state){
      return state.size
    }
  }
  
  export default {
    state,
    mutations,
    actions,
    getters,
    // 命名空间
    namespaced: true
  }
  
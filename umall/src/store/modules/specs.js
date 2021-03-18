// 状态层

import { specsList, specsTotal } from "../../utils/request";
// 存放数据
const state = {
    list: [],
    total: 0,
    size: 2,
    page: 1
}

// 修改数据
const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    changeTotal(state, num) {
        state.total = num
    },
    changePage(state, num) {
        state.page = num
    }
}

// 请求
const actions = {
    // 请求列表
    reqChangeList(context,bool) {
        let data = bool?{}:{size:context.state.size,page:context.state.page}
        specsList(data).then(res => {
            let list = res.data.list ? res.data.list : []
            if (list.length == 0) {
                context.commit('changePage', context.state.page - 1)
                context.dispatch('reqChangeList')
            }
            context.commit('changeList', list)
            list.forEach(item=>{
                item.attrs = JSON.parse(item.attrs)
               })
                context.commit('changeList',list)
        })
    },
    // 请求总条数
    reqChangeTotal(context) {
        specsTotal().then(res => {
            context.commit('changeTotal', res.data.list[0].total)
        })
    },
    // 修改页码
    reqChangePage(context, num) {
        context.commit('changePage', num)
    }
}

// 导出数据
const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
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
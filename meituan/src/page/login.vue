<template>
  <div>
    <h1>登录</h1>
    <div>账号：<input type="text" v-model="obj.username" /></div>
    <div>密码：<input type="text" v-model="obj.password" /></div>
    <router-link to="/index">去大首页</router-link>
    <button @click="sub">登录</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      obj: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    sub() {
      if(this.obj.username==="user"&&this.obj.password==='123'){
        this.$router.push('/index')
      }
    },
  },
  components: {},
  mounted() {},
  destroyed() {},
};
</script>
<style>
</style>
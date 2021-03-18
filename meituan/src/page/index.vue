<template>
  <div>
    index
    <router-view></router-view>
    <footer>
      <router-link to="/index/home" active-class="active">首页</router-link
      ><router-link to="/index/order" active-class="active">订单</router-link
      ><router-link to="/index/mine" active-class="active">我的</router-link>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  components: {},
  mounted() {},
  destroyed() {},
};
</script>
<style>
footer {
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
}
footer a {
  flex: 1;
  text-align: center;
  font-size: 0.26rem;
  line-height: 0.5rem;
  border: 1px solid black;
}
.active{
  background: crimson;
  color: burlywood;
}
</style>
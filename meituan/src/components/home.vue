<template>
  <div>
    <button @click="$router.go(-1)">返回</button>
    <v-back></v-back>
    <h3>===router-link===</h3>
    <router-link to="/food">外卖</router-link>
    <router-link to="/movie">电影</router-link>
    <h3>===$router.push()===</h3>
    <button @click="$router.push('/food')">外卖</button>
    <button @click="$router.push('/movie')">电影</button>
     <h3>===$router.replace()===</h3>
    <button @click="$router.replace('/food')">外卖</button>
    <button @click="$router.replace('/movie')">电影</button>
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
a{
  font-size: 0.24rem;
  color: blueviolet;
  border: 1px solid black;
  display: inline-block;
  width:100px;
  text-align: center;
  line-height: 40px;
}
button{
  font-size: 0.24rem;
  color: blueviolet;
  border: 1px solid black;
  display: inline-block;
  width:100px;
  text-align: center;
  line-height: 40px;
}
</style>
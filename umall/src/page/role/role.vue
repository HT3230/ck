<template>
  <div> <el-button type="primary" @click="add">添 加</el-button>
    <v-add :info="obj" ref="aaa"></v-add>
    <v-list @update="update"></v-list>
   
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {
    vAdd,
    vList
  },
  data() {
    return {
      obj:{
        isShow:false,
        isAdd:true
      }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    add(){
  this.obj.isAdd=true
  this.obj.isShow=true
    },
    update(id){
 this.obj.isAdd=false
 this.obj.isShow=true
 this.$refs.aaa.getOne(id)

    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>
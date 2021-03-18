<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-list @update="update"></v-list>
    <v-add :info="info" ref="aaa"></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  props: [],
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isShow: false,
        isAdd: true,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    add() {
      this.info.isShow = true;
      this.info.isAdd = true;
    },
    update(uid) {
      this.info.isShow = true;
      this.info.isAdd = false;
       this.$refs.aaa.getOne(uid)
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>
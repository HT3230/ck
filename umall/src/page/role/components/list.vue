<template>
  <div>
    <el-table :data="roleList" border style="width: 100%">
      <el-table-column prop="id" label="角色编号"> </el-table-column>
      <el-table-column prop="rolename" label="角色名称"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启 用</el-button
          >
          <el-button type="info" v-else>禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
       <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="update(scope.row.id)">编 辑</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删 除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { roleDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "role/reqChangeList",
    }),
   del(id){
        roleDel({id:id}).then(res=>{
          if(res.data.code==200){
            successAlert(res.data.msg)
            this.reqChangeList()
          }else{
            warningAlert(res.data.msg)
          }
        })
      },
      update(id){
      this.$emit('update',id)
      }
  },
  mounted() {
    this.reqChangeList();
  },
};
</script>
<style scoped>
</style>
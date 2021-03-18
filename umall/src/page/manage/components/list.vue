<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column label="状态">
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
            <el-button type="primary" @click="update(scope.row.uid)"
              >编 辑</el-button
            >
            <el-button type="danger" @click="del(scope.row.uid)"
              >删 除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { manageDel, menuList } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      // 列表数据
      list: "manage/list",
      total: "manage/total",
      size: "manage/size",
    }),
  },
  methods: {
    ...mapActions({
      // 请求列表
      reqChangeList: "manage/reqChangeList",
      // 请求总条数
      reqChangeTotal: "manage/reqChangeTotal",
      // 修改页码
      reqChangePage: "manage/reqChangePage",
    }),
    del(uid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          manageDel({ uid: uid }).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              // 重新请求数据
              this.reqChangeList();
              // 重新请求总条数
              this.reqChangeTotal();
            } else {
              warningAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑
    update(uid) {
      // 去通知父级做某些事
      this.$emit("update", uid);
    },
    // 页码变化
    changePage(e) {
     this.reqChangePage(e)
     this.reqChangeList()
    },
  },
  mounted() {
    this.reqChangeList();
    this.reqChangeTotal();
  },
};
</script>
<style scoped>
</style>
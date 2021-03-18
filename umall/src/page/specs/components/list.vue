<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="规格编号"> </el-table-column>
      <el-table-column prop="specsname" label="规格名称"> </el-table-column>
      <el-table-column prop="rolename" label="规格属性">
        <template slot-scope="scope">
          <div>
            <el-tag v-for="item in scope.row.attrs" :key="item">{{
              item
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
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
            <el-button type="primary" @click="update(scope.row.id)"
              >编 辑</el-button
            >
            <el-button type="danger" @click="del(scope.row.id)"
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
import { specsDel, menuList } from "../../../utils/request";
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
      list: "specs/list",
      total: "specs/total",
      size: "specs/size",
    }),
  },
  methods: {
    ...mapActions({
      // 请求列表
      reqChangeList: "specs/reqChangeList",
      // 请求总条数
      reqChangeTotal: "specs/reqChangeTotal",
      // 修改页码
      reqChangePage: "specs/reqChangePage",
    }),
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          specsDel({ id: id }).then((res) => {
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
    update(id) {
      // 去通知父级做某些事
      this.$emit("update", id);
    },
    // 页码变化
    changePage(e) {
      this.reqChangePage(e);
      this.reqChangeList();
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
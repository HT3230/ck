<template>
  <div>
    <el-table :data="list" style="width: 100%;margin-bottom: 20px;" row-key="id" border
      :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="分类编号">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgUrl+scope.row.img">
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启 用</el-button>
          <el-button type="info" v-else>禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="update(scope.row.id)">编 辑</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删 除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { cateDel} from "../../../utils/request";
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
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "cate/reqChangeList",
    }),
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
           cateDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqChangeList();
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
    update(id){
        // 去通知父级做某些事
        this.$emit("update",id)
      }
  },
  mounted() {
    this.reqChangeList();
  },
};
</script>
<style scoped>
img{
  width: 100px;
  height: 100px;
}
</style>
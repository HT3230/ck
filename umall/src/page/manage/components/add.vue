<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '菜单添加' : '菜单编辑'"
      :visible.sync="info.isShow"
      
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="所属角色">
            <el-select v-model="form.roleid" placeholder="请选择所属角色">
              <el-option label="请选择" disabled :value="0"></el-option>
              <!-- 这里需要展示状态层的列表 -->
              <el-option
                v-for="item in list"
                :key="item.id"
                :label="item.rolename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              v-model="form.status"
              :active-value="1"
              :inactive-value="2"
            ></el-switch>
          </el-form-item>
        </el-form>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submit" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="edit" v-else>修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { manageadd, manageedit, manageInfo } from "../../../utils/request";
import { indexRouter } from "../../../router/index";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid: 0,
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "role/reqChangeList",
      manageReqChangeList: "manage/reqChangeList",
      reqChangeTotal: "manage/reqChangeTotal",
    }),
    // 添加
    submit() {
      manageadd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.info.isShow = false;
          successAlert(res.data.msg);
          this.empty();
          this.manageReqChangeList();
          this.reqChangeTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条信息
    getOne(uid) {
      manageInfo(uid).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.uid = uid;
          this.form.password = "";
        }
      });
    },
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    // 修改
    edit() {
      manageedit(this.form).then((res) => {
        if (res.data.code == 200) {
          // 出现成功的提示窗
          successAlert(res.data.msg);
          // 清空form数据
          this.empty();
          // 关闭add这个组件
          this.info.isShow = false;
          // 重新渲染列表数据
          this.manageReqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqChangeList();
  },
};
</script>
<style scoped>
</style>
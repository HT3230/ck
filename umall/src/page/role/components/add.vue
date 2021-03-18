<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '角色添加' : '角色编辑'"
      :visible.sync="info.isShow"
      width="30%"
    >
      <el-form
        :model="form"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" prop="region">
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            node-key="id"
            :props="{ label: 'title', children: 'children' }"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" prop="delivery">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { roleAdd, roleInfo, roleedit } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      menuReqChangeList: "menu/reqChangeList",
      rolereqChangeList: "role/reqChangeList",
    }),
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    submit() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      roleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 成功的提示弹窗
          successAlert(res.data.msg);
          // 关闭当前页面
          this.cancel();
          this.rolereqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getOne(id) {
      roleInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        }
      });
    },
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      roleedit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.isShow = false;
          this.empty();
          this.rolereqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.menuReqChangeList();
  },
};
</script>
<style scoped>
</style>
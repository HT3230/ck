<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '菜单添加' : '菜单编辑'"
      :visible.sync="info.isShow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="手机号">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
            <el-form-item label="昵称">
            <el-input v-model="form.nickname"></el-input>
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
        <el-button type="primary" @click="edit">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { memberedit, memberinfo } from "../../../utils/request";
import { indexRouter } from "../../../router/index";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        uid: 0,
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "member/reqChangeList",
    }),
    changePid(){
        if(this.form.pid==0){
          this.form.type = 1
          this.form.url = ""
        }else{
          this.form.type = 2
          this.form.icon = ""
        }
      },
    getOne(uid) {
      memberinfo(uid).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.uid = uid;
          this.form.password=''
        }
      });
    },
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    empty() {
      this.form = {
        uid: 0,
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    edit(){
        memberedit(this.form).then(res=>{
          if(res.data.code == 200){
            // 出现成功的提示窗
            successAlert(res.data.msg)
            // 清空form数据
            this.empty()
            // 关闭add这个组件
            this.info.isShow = false
            // 重新渲染列表数据
            this.reqChangeList()
          }else{
            warningAlert(res.data.msg)
          }
        })
      }
  },
  mounted() {},
};
</script>
<style scoped>
</style>
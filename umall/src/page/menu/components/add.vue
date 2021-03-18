<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '菜单添加' : '菜单编辑'"
      :visible.sync="info.isShow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="菜单名称">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="上级菜单">
            <el-select
              v-model="form.pid"
              placeholder="请选择顶级菜单"
              @change="changePid"
            >
              <el-option label="顶级菜单" :value="0"></el-option>
              <!-- 这里需要展示状态层的列表 -->
              <el-option
                v-for="item in list"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单类型">
            <el-radio-group v-model="form.type">
              <el-radio disabled :label="1">目录</el-radio>
              <el-radio disabled :label="2">菜单</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单图标" v-if="form.type == 1">
            <el-select v-model="form.icon" placeholder="请选择图标">
              <el-option v-for="item in icons" :key="item" :value="item">
                <i :class="item"></i>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单地址" v-else>
            <el-select v-model="form.url" placeholder="请选择菜单地址">
              <el-option
                v-for="item in indexRouter"
                :key="item.path"
                :label="item.name"
                :value="'/' + item.path"
              ></el-option>
            </el-select>
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
import { menuadd, menuedit, menuInfo } from "../../../utils/request";
import { indexRouter } from "../../../router/index";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      indexRouter: indexRouter,
      icons: [
        "el-icon-upload",
        "el-icon-s-help",
        "el-icon-message-solid",
        "el-icon-video-camera-solid",
      ],
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "menu/reqChangeList",
    }),
    submit() {
      menuadd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.info.isShow = false;
          successAlert(res.data.msg);
           this.empty()
          this.reqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    changePid(){
        if(this.form.pid==0){
          this.form.type = 1
          this.form.url = ""
        }else{
          this.form.type = 2
          this.form.icon = ""
        }
      },
    getOne(id) {
      menuInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
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
    edit(){
        menuedit(this.form).then(res=>{
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
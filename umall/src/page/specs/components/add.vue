<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '菜单添加' : '菜单编辑'"
      :visible.sync="info.isShow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="规格名称">
            <el-input v-model="form.specsname"></el-input>
          </el-form-item>
          <el-form-item label="规格属性" v-for="(item,index) in attrArr" :key="index">
             <div class="attrInp">
            <el-input v-model="item.value"></el-input>
            <el-button type="primary" v-if="index==0" @click="addattr">新增规格属性</el-button>
            <el-button type="danger" v-else @click="delAttr">删除</el-button>
          </div>
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
import { specsadd, specsedit, specsInfo } from "../../../utils/request";
import { indexRouter } from "../../../router/index";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      attrArr:[{value:''},{value:''}],
      form: {
        form: {
          specsname: "",
          attrs: "",
          status: 1
        }
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "role/reqChangeList",
      ReqChangeList: "specs/reqChangeList",
      reqChangeTotal: "specs/reqChangeTotal",
    }),
    // 新增
    addattr(){
 this.attrArr.push({value:''})
    },
    delAttr(index){
 this.attrArr.splice(index,1)

    },
    // 添加
    submit() {
       this.form.attrs = JSON.stringify(this.attrArr.map(item=>item.value))
      specsadd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.info.isShow = false;
          successAlert(res.data.msg);
          this.empty();
          this.ReqChangeList();
          this.reqChangeTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条信息
    getOne(id) {
      specsInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list[0];
          this.attrArr = JSON.parse(this.form.attrs).map(item=>({value:item}))
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
        specsname: "",
          attrs: "",
          status: 1
      };
         this.attrArr=[{value:''},{value:''}]
    },
    // 修改
    edit() {
        this.form.attrs = JSON.stringify(this.attrArr.map(item=>item.value))
      specsedit(this.form).then((res) => {
        if (res.data.code == 200) {
          // 出现成功的提示窗
          successAlert(res.data.msg);
          // 清空form数据
          this.empty();
          // 关闭add这个组件
          this.info.isShow = false;
          // 重新渲染列表数据
          this.ReqChangeList();
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
.attrInp{
  display: flex;
}
</style>
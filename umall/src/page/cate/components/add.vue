<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '商品添加' : '商品编辑'"
      :visible.sync="info.isShow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="上级分类">
            <el-select v-model="form.pid" placeholder="请选择上级分类">
              <el-option label="顶级分类" :value="0"></el-option>
              <!-- 这里需要展示状态层的列表 -->
              <el-option
                v-for="item in list"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称">
            <el-input v-model="form.catename"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <div class="fileBox">
              <h3>+</h3>
              <img :src="imgUrl" v-if="imgUrl" />
              <input type="file" @change="changeFile" v-if="info.isShow"/>
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
import { cateadd,cateInfo,cateedit } from "../../../utils/request";
import { indexRouter } from "../../../router/index";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imgUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
    };
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
    changeFile(e) {
      let file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("图片大小超出限制");
        return;
      }
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    submit() {
      cateadd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.info.isShow = false;
          successAlert(res.data.msg);
          this.empty();
          this.reqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getOne(id) {
      cateInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.imgUrl =this.$imgUrl+this.form.img
          this.form.id = id;
        }
      });
    },
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    // 清空
    empty() {
      (this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      }),
        (this.imgUrl = "");
    },
    // 修改
    edit() {
      cateedit(this.form).then((res) => {
        if (res.data.code == 200) {
          // 出现成功的提示窗
          successAlert(res.data.msg);
          // 清空form数据
          this.empty();
          // 关闭add这个组件
          this.info.isShow = false;
          // 重新渲染列表数据
          this.reqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.fileBox {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
}

.fileBox input {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.fileBox h3 {
  font-size: 40px;
  line-height: 150px;
  text-align: center;
  margin: 0;
}

.fileBox img {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
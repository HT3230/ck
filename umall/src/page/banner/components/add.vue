<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '商品添加' : '商品编辑'"
      :visible.sync="info.isShow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <div class="fileBox">
              <h3>+</h3>
              <img :src="imgUrl" v-if="imgUrl" />
              <input type="file" @change="changeFile" v-if="info.isShow" />
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
import { banneradd, bannerinfo, banneredit } from "../../../utils/request";
import { indexRouter } from "../../../router/index";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imgUrl: "",
      form: {
        title: "",
        img: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "banner/reqChangeList",
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
      banneradd(this.form).then((res) => {
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
      bannerinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.imgUrl = this.$imgUrl + this.form.img;
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
        title: "",
        img: "",
        status: 1,
      }),
        (this.imgUrl = "");
    },
    // 修改
    edit() {
      banneredit(this.form).then((res) => {
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
<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '菜单添加' : '菜单编辑'"
      :visible.sync="info.isShow"
      :before-close="cancel"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="活动期限" class="qx">
            <div class="block">
              <el-date-picker
                v-model="value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['21:00:00']"
                @change="shijian"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="一级分类">
            <el-select
              v-model="form.first_cateid"
              placeholder="请选择分类"
              @change="changeFirst"
            >
              <!-- 这里需要展示状态层的列表 -->
              <el-option
                v-for="item in cateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类">
            <el-select
              v-model="form.second_cateid"
              placeholder="请选择分类"
              @change="bbb"
            >
              <!-- 这里需要展示状态层的列表 -->
              <el-option
                v-for="item in secondArr"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品">
            <el-select v-model="form.goodsid" placeholder="请选择分类">
              <!-- 这里需要展示状态层的列表 -->
              <el-option
                v-for="item in goodsList"
                :key="item.id"
                :label="item.goodsname"
                :value="item.id"
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
import {
  cateList,
  seckadd,
  goodsInfo,
  goodsedit,
  goodsList,
  secklist,
  seckinfo,
  seckedit,
} from "../../../utils/request";
import { indexRouter } from "../../../router/index";
import { successAlert, warningAlert } from "../../../utils/alert";
import E from "wangeditor";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      goodsList: "",
      value1: "",
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      // 用于渲染二级分类
      secondArr: [],
    };
  },
  computed: {
    ...mapGetters({
      // cate列表数据
      cateList: "cate/list",
      // seckill列表数据
      seckList: "seckill/list",
    }),
  },
  methods: {
    ...mapActions({
      // cate列表请求
      reqCateList: "cate/reqChangeList",
      // specs列表请求
      reqSeckillList: "seckill/reqChangeList",
      // goods列表请求
      reqGoodsList: "goods/reqChangeList",
    }),
    bbb() {
      this.goodsList = "";

      goodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.goodsList = res.data.list;
        this.form.goodsid = "";
      });
    },
    changeFirst() {
      cateList({ pid: this.form.first_cateid }).then((res) => {
        this.secondArr = res.data.list;
        this.form.second_cateid = "";
        this.form.goodsid = "";
      });
    },
    // 添加
    submit() {
      seckadd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 关闭弹窗
          this.info.isShow = false;
          // 清空form数据
          this.empty();
          // 成功的提示
          successAlert(res.data.msg);
          // 重新请求数据，导致状态层的数据变了，所以list列表页变了
          this.reqSeckillList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 时间
    shijian() {
      this.form.begintime = +new Date(this.value1[0]);
      this.form.endtime = +new Date(this.value1[1]);
    },
    // 获取一条信息
    getOne(id) {
      seckinfo(id).then((res) => {
        if (res.data.code == 200) {
          // 1、将请求的数据赋值给form
          this.form = res.data.list;
          // 2、因为编辑的时候需要id，所以在这里补充一下id
          this.form.id = id;
          // 3、根据一级分类的id请求渲染二级分类列表
          cateList({
            pid: this.form.first_cateid,
          }).then((res) => {
            this.secondArr = res.data.list;
          });
          goodsList({
            fid: this.form.first_cateid,
            sid: this.form.second_cateid,
          }).then((res) => {
            this.goodsList = res.data.list;
          });
          let first= new Date(Number(this.form.begintime)).toLocaleDateString()
          let end= new Date(Number(this.form.endtime)).toLocaleDateString()
          this.value1=[first,end]
        }
      });
    },
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      // 用于渲染二级分类
      this.secondArr = [];
      this.specsArr = [];
       this.value1= ""
    },
    // 修改
    edit() {
      seckedit(this.form).then((res) => {
        if (res.data.code == 200) {
          // 出现成功的提示窗
          successAlert(res.data.msg);
          // 清空form数据
          this.empty();
          // 关闭add这个组件
          this.info.isShow = false;
          // 重新渲染列表数据
          this.reqSeckillList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqCateList();
    this.reqGoodsList();
  },
};
</script>
<style scoped>
.fileBox {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
}

.fileBox h3 {
  font-size: 40px;
  text-align: center;
  line-height: 150px;
  margin: 0;
}

.fileBox img {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
}

.fileBox input {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>
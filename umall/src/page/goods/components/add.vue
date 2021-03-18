<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '菜单添加' : '菜单编辑'"
      :visible.sync="info.isShow"
      @opened="opened"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="一级分类">
            <el-select
              v-model="form.first_cateid"
              placeholder="请选择一级分类"
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
              placeholder="请选择二级分类"
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
          <el-form-item label="商品名称">
            <el-input v-model="form.goodsname"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="市场价格">
            <el-input v-model="form.market_price"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <div class="fileBox">
              <h3>+</h3>
              <img :src="imgUrl" v-if="imgUrl" />
              <input type="file" v-if="info.isShow" @change="changeFile" />
            </div>
          </el-form-item>
          <el-form-item label="商品规格">
            <el-select
              v-model="form.specsid"
              placeholder="请选择商品规格"
              @change="changeSpecs"
            >
              <!-- 这里需要展示状态层的列表 -->
              <el-option
                v-for="item in specsList"
                :key="item.id"
                :label="item.specsname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格属性">
            <el-select
              v-model="form.specsattr"
              multiple
              placeholder="请选择规格属性"
            >
              <el-option
                v-for="item in specsArr"
                :key="item.id"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否新品">
            <el-radio-group v-model="form.isnew">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否热卖">
            <el-radio-group v-model="form.ishot">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              v-model="form.status"
              :active-value="1"
              :inactive-value="2"
            ></el-switch>
          </el-form-item>
          <el-form-item label="商品描述">
            <div id="div1" v-if="info.isShow">

          </div>
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
  goodsadd,
  goodsInfo,
  goodsedit,
} from "../../../utils/request";
import { indexRouter } from "../../../router/index";
import { successAlert, warningAlert } from "../../../utils/alert";
import E from "wangeditor";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      // 用于渲染二级分类
      secondArr: [],
      // 用于渲染图片
      imgUrl: "",
      // 用于渲染规格属性
      specsArr: [],
    };
  },
  computed: {
    ...mapGetters({
      // cate列表数据
      cateList: "cate/list",
      // specs列表数据
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      // cate列表请求
      reqCateList: "cate/reqChangeList",
      // specs列表请求
      reqSpecsList: "specs/reqChangeList",
      // goods列表请求
      reqGoodsList: "goods/reqChangeList",
      // goods列表总条数
      reqGoodsTotal: "goods/reqChangeTotal",
    }),
    changeFirst() {
      cateList({ pid: this.form.first_cateid }).then((res) => {
        this.secondArr = res.data.list;
        this.form.second_cateid = "";
      });
    },
     opened() {
      // 加载富文本
      this.editor = new E("#div1");
      this.editor.create();

      // 设置富文本的内容
      this.editor.txt.html(this.form.description);
    },
    changeSpecs() {
      // 清空规格属性
      this.specsArr = [];
      this.form.specsattr = [];
      // 找到specsList里面id是我需要的那一条数据
      let obj = this.specsList.find((item) => item.id == this.form.specsid);
      // 把那一条数据的attrs赋值给我的specsArr
      this.specsArr = obj.attrs;
    },

    changeFile(e) {
      let file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("图片大小超出限制");
        return;
      }
      // 将文件信息转换成一张具体的图片
      this.imgUrl = URL.createObjectURL(file);
      // 同时还要放到form中，因为后端也需要文件信息
      this.form.img = file;
    },
    // 添加
    submit() {
       // 在请求之前将富文本的内容加入到form中
      this.form.description = this.editor.txt.html();
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      goodsadd(data).then((res) => {
        if (res.data.code == 200) {
          // 关闭弹窗
          this.info.isShow = false;
          // 清空form数据
          this.empty();
          // 成功的提示
          successAlert(res.data.msg);
          // 重新请求数据，导致状态层的数据变了，所以list列表页变了
          this.reqGoodsList();
          //  重新请求总数据条数
          this.reqGoodsTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条信息
    getOne(id) {
      goodsInfo(id).then((res) => {
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
          // 4、处理图片
          this.imgUrl = this.$imgUrl + this.form.img;
          // 5、处理规格属性
          this.form.specsattr = JSON.parse(this.form.specsattr);
          let obj = this.specsList.find((item) => item.id == this.form.specsid);
          // 把那一条数据的attrs赋值给我的specsArr
          this.specsArr = obj.attrs;
        }
      });
    },
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      // 用于渲染二级分类
      this.secondArr = [];
      this.imgUrl = "";
      this.specsArr = [];
    },
    // 修改
    edit() {
       // 在请求之前将富文本的内容加入到form中
      this.form.description = this.editor.txt.html();
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      goodsedit(data).then((res) => {
        if (res.data.code == 200) {
          // 出现成功的提示窗
          successAlert(res.data.msg);
          // 清空form数据
          this.empty();
          // 关闭add这个组件
          this.info.isShow = false;
          // 重新渲染列表数据
          this.reqGoodsList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqCateList();
    this.reqSpecsList(true);
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
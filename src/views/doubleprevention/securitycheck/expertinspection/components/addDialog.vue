<template>
  <basic-dialog
    :title="title"
    :icon="icon"
    :width="1013"
    :height="'80%'"
    v-bind="$attrs"
    @close="openFlag = false"
    :openFlag="openFlag"
    show-zoom
    resize
    :showFooter="true"
  >
    <template #content>
      <div class="wrap">
        <el-form ref="form" :model="form" label-width="108px" :inline="true">
          <el-row>
            <el-col :span="24">
              <el-form-item label="检查名称">
                <el-input
                  v-model="form.mc"
                  placeholder="请输入检查名称"
                  :style="width2"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="检查时间">
                <el-date-picker
                  style="width: 100%"
                  v-model="form.sj"
                  type="date"
                  :style="width"
                  placeholder="选择检查时间"
                  :disabled="disabled"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="整改期限">
                <el-date-picker
                  style="width: 100%"
                  v-model="form.qx"
                  type="date"
                  placeholder="选择整改期限"
                  :style="width"
                  :disabled="disabled"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="检查人员" prop="projectType">
                <el-select
                  v-model="form.ry"
                  :style="width"
                  :disabled="disabled"
                >
                  <el-option label="一" value="shanghai"></el-option>
                  <el-option label="二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="整改负责人"
                prop="projectType"
                :disabled="disabled"
              >
                <el-select v-model="form.fzr" :style="width">
                  <el-option label="一" value="shanghai"></el-option>
                  <el-option label="二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-button
            type="primary"
            style="margin: 10px auto; display: block"
            @click="addItem"
            :disabled="disabled"
            >添加检查记录</el-button
          >
          <div class="detail" v-show="detail.length > 0">
            <div class="detail_title">
              <span class="line"></span>
              <span>检查情况</span>
            </div>
          </div>
          <div
            class="item"
            v-for="(item, index) in detail"
            :key="index"
            style="
              display: flex;
              border-bottom: 1px solid #4a80fc;
              margin-bottom: 20px;
            "
          >
            <div>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="存在问题">
                    <el-input
                      v-model="detail[index].wt"
                      placeholder="请输入检查名称"
                      :style="width2"
                      :disabled="disabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="现场图片"
                    :style="width2"
                    :disabled="disabled"
                  >
                    <basic-upload
                      key="file"
                      @onSuccess="
                        (fileList) => onSuccess(fileList, 'pic', index)
                      "
                      @onRemove="(fileList) => onRemove(fileList, 'pic', index)"
                      :photos="form.courseWare"
                      :limit="2"
                      :disabled="disabled"
                    ></basic-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div style="display: flex; align-items: center">
              <i
                class="iconfont icon-shanchu"
                style="color: red; cursor: pointer"
                title="删除本条记录"
                @click="delItem(index)"
              ></i>
            </div>
          </div>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="上传检查记录"
                :style="width2"
                :disabled="disabled"
              >
                <basic-upload
                  key="file"
                  @onSuccess="(fileList) => onSuccess(fileList, 'courseWare')"
                  @onRemove="(fileList) => onRemove(fileList, 'courseWare')"
                  :photos="form.courseWare"
                  :limit="2"
                  :disabled="disabled"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input
                  v-model="form.courseName"
                  placeholder="请输入备注"
                  :style="width2"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </template>
    <template #bottom>
      <div>
        <el-button type="primary" @click="submitForm()" v-show="!disabled"
          >保存
        </el-button>
        <el-button type="success" @click="reset()" v-show="!disabled"
          >重置
        </el-button>
        <el-button type="warning" @click="close">取消</el-button>
      </div>
    </template>
  </basic-dialog>
</template>
<script>
export default {
  props: {
    dict: Object,
    default: {},
  },
  data() {
    return {
      openFlag: false,
      isEditId: "",
      width: "width:320px",
      width2: "width:788px",
      disabled: false,
      form: {},
      detail: [],
    };
  },
  mounted() {
    console.log(this.dict);
  },
  methods: {
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增检查记录";
        this.disabled = false;
      } else if (type == "ccfucha") {
        // this.getDetail(row.id);
        // this.isEditId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "修改初查记录";
        this.disabled = false;
      } else if (type == "chakan") {
        // this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看初查记录";
        this.disabled = true;
      }
      this.openFlag = true;
    },
    submitForm() {
      console.log(this.formArr);
    },
    reset() {},
    close() {},
    // 删除记录
    delItem(index) {
      this.detail.splice(index, 1);
    },
    addItem() {
      let obj = {
        wt: "",
        pic: "",
      };
      this.detail.push(obj);
    },
    // 上传图片成功
    onSuccess(fileList, params, index) {
      this.detail[index][params] = fileList;
      console.log(this.detail);
    },
    // 删除图片
    onRemove(fileList, params, index) {
      this.detail[index][params] = fileList;
      console.log(this.detail);
    },
  },
};
</script>
<style scoped lang="scss">
/deep/ .vxe-modal--content {
  background: #eeeeee;
}
.wrap {
  padding: 20px;
  background: white;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.title {
  width: 100%;
  border-bottom: 1px solid #4a80fc;
  height: 30px;
  margin: 0px auto;
  line-height: 30px;
  white-space: normal;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 22px;
}
.detail_title {
  border-bottom: 1px solid #4a80fc;
  font-size: 14px;
  color: #212121;
  width: 95%;
  margin: 30px auto;
  font-weight: bold;
  .line {
    display: inline-block;
    width: 2px;
    height: 12px;
    background-color: #4a80fc;
    margin-right: 8px;
  }
}
</style>

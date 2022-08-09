<template>
  <basic-dialog
    :title="title"
    :icon="icon"
    :width="656"
    height="70%"
    v-bind="$attrs"
    @close="openFlag = false"
    :openFlag="openFlag"
    show-zoom
    resize
  >
    <template #content>
      <div class="wrap">
        <el-form ref="form" :model="form" label-width="108px"  :inline="true">
          <el-form-item label="资质证书名称">
            <el-input
              v-model="form.courseName"
              placeholder="请输入资质证书名称"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="资质证书编号">
            <el-input
              v-model="form.courseName"
              placeholder="请输入资质证书编号"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="级别">
            <el-select
              v-model="form.trainCategory"
              placeholder="请选择级别"
              :disabled="disabled"
              :style="width"
            >
              <!-- <el-option
                v-for="item in dict.commonJudge"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="许可内容">
            <el-input
              v-model="form.courseName"
              placeholder="请输入许可内容"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="许可内容">
            <el-input
              v-model="form.courseName"
              placeholder="请输入许可内容"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="取证日期">
            <el-date-picker  v-model="form.courseName"
              placeholder="请选择取证日期"
              :style="width"
              :disabled="disabled"
              >
            </el-date-picker>
          </el-form-item>
           <el-form-item label="到期日期">
            <el-date-picker  v-model="form.courseName"
              placeholder="请选择到期日期"
              :style="width"
              :disabled="disabled"
              >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="附件" :style="width" :disabled="disabled">
            <basic-upload
              key="file"
              @onSuccess="(fileList) => onSuccess(fileList, 'courseWare')"
              @onRemove="(fileList) => onRemove(fileList, 'courseWare')"
              :photos="form.courseWare"
              :limit="2"
              :disabled="disabled"
            ></basic-upload>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="form.courseName"
              placeholder="请输入备注"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
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
      width: "width:450px",
      disabled: false,
      form: {
        type: [],
      },
    };
  },
  mounted() {
    console.log(this.dict);
  },
  methods: {
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增资质信息";
        this.disabled = false;
      } else if (type == "bianji") {
        this.getDetail(row.id);
        this.isEditId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑资质信息";
        this.disabled = false;
      } else if (type == "chakan") {
        // this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看资质信息";
        this.disabled = true;
      }
      this.openFlag = true;
    },
    submitForm() {},
    reset() {},
    close() {},
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
</style>

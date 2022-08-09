<template>
  <basic-dialog
    :title="title"
    :icon="icon"
    :width="1000"
    height="85%"
    v-bind="$attrs"
    @close="openFlag = false"
    :openFlag="openFlag"
    show-zoom
    resize
  >
    <template #content>
      <div class="wrap">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="承包商">
            <el-input
              v-model="form.courseName"
              :style="width2"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目类型">
            <el-input
              v-model="form.courseName"
              :style="width2"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目类型">
            <el-input
              v-model="form.courseName"
              :style="width2"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="服务项目内容">
            <el-input
              v-model="form.courseName"
              :style="width2"
              :disabled="disabled"
              type="textarea"
              rows="3"
              resize="none"
            ></el-input>
          </el-form-item>

          <el-form-item label="开始时间">
            <el-date-picker
              v-model="form.courseName"
              :style="width"
              :disabled="disabled"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="form.courseName"
              :style="width"
              :disabled="disabled"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="商务合同" :style="width2" :disabled="disabled">
            <basic-upload
              key="file"
              @onSuccess="(fileList) => onSuccess(fileList, 'courseWare')"
              @onRemove="(fileList) => onRemove(fileList, 'courseWare')"
              :photos="form.courseWare"
              :limit="2"
              :disabled="disabled"
            ></basic-upload>
          </el-form-item>
          <el-form-item label="安全合同" :style="width2" :disabled="disabled">
            <basic-upload
              key="file"
              @onSuccess="(fileList) => onSuccess(fileList, 'courseWare')"
              @onRemove="(fileList) => onRemove(fileList, 'courseWare')"
              :photos="form.courseWare"
              :limit="2"
              :disabled="disabled"
            ></basic-upload>
          </el-form-item>
          <el-form-item label="施工方案" :style="width2" :disabled="disabled">
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
              :style="width2"
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
      width: "width:320px",
      width2: "width:803px",
      disabled: true,
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
        this.title = "新增作业人员信息";
        this.disabled = false;
      } else if (type == "bianji") {
        this.getDetail(row.id);
        this.isEditId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑作业人员信息";
        this.disabled = false;
      } else if (type == "chakan") {
        // this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看作业人员信息";
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
/deep/ .el-form {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
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
/deep/.el-form-item__label {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  line-height: 20px;
}
</style>

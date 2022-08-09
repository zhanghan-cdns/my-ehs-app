<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1000px"
      height="70%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
    >
      <template #content>
        <el-form
          :inline="true"
          ref="basicFormRef"
          :model="form"
          label-width="128px"
          :rules="rules"
          :disabled="isDisabled"
        >
          <el-form-item label="课件名称" prop="coursewareName">
            <el-input
              v-model="form.coursewareName"
              placeholder="请输入课件名称"
              style="width: 320px"
              :disabled="isDisabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="文件类型" prop="fileType">
            <el-select
              v-model="form.fileType"
              placeholder="请选择课件类型"
              style="width: 320px"
              :disabled="isDisabled"
            >
              <el-option
                v-for="item in dict.educationSetWarelibraryFiletype"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属类别" prop="category">
            <el-select
              v-model="form.category"
              placeholder="请选择所属类别"
              style="width: 320px"
              :disabled="isDisabled"
            >
              <el-option
                v-for="item in dict.educationSetWarelibraryCategory"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键字" prop="keyword">
            <el-input
              v-model="form.keyword"
              placeholder="请输入关键字"
              style="width: 320px"
              :disabled="isDisabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="教程简介">
            <el-input
              v-model="form.tutorialIntroduction"
              type="textarea"
              rows="3"
              placeholder="请输入教程简介"
              style="width: 802px"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传课件" style="width: 800px">
             <render-upload
              :fileList="form.courseWare"
              @uploadSuccess="(fileList) => onSuccess(fileList, 'courseWare')"
              @handleRemove="(index) => onRemove(index, 'courseWare')"
              :openOff="isDisabled"
            ></render-upload>
          </el-form-item>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm()" v-show="!isDisabled"
            >保存
          </el-button>
          <el-button type="success" @click="reset()" v-show="!isDisabled"
            >重置
          </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import {
  createAPI,
  getDetailAPI,
  updateAPI,
} from "@/api/education/trainingSettings/coursewareManagement";
export default {
  name: "editDialog",
  mixins: [tableMixins],
  data() {
    return {
      title: "",
      icon: "",
      openFlag: false,
      isDisabled: false,
      editId: "",
      form: {
        coursewareName: "",
        fileType: "",
        category: "",
        keyword: "",
        tutorialIntroduction: "",
        courseWare:[],
      },
      rules: {
        coursewareName: [
          { required: true, message: "请输入课件名称", trigger: "blur" },
        ],
        fileType: [
          { required: true, message: "请选择文件类型", trigger: "change" },
        ],
        category: [
          { required: true, message: "请选择所属类别", trigger: "change" },
        ],
        keyword: [{ required: true, message: "请输入关键字", trigger: "blur" }],
      },
    };
  },
  props: {
    dict: Object,
    default: {},
  },
  methods: {
    // 打开
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增课件信息";
        this.isDisabled = false;
      } else if (type == "bianji") {
        this.getDetail(row.id);
        this.editId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑课件信息";
        this.isDisabled = false;
      } else if (type == "chakan") {
        this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看课件信息";
        this.isDisabled = true;
      }
      this.openFlag = true;
    },
    // 关闭
    close() {
      this.openFlag = false;
      this.editId = "";
      this.isDisabled = "";
      this.reset();
    },
    // 重置
    reset() {
      this.form = {
       coursewareName: "",
        fileType: "",
        category: "",
        keyword: "",
        tutorialIntroduction: "",
        courseWare:[],
      };
      this.$refs.basicFormRef.resetFields();
    },
    // 保存
    async submitForm() {
      this.$refs.basicFormRef.validate((valid) => {
        if (!valid) {
          return false;
        } else {
          if (this.editId) {
            let params = {
              id: this.editId,
              ...this.form,
            };
            updateAPI(params).then((res) => {
              this.$message.success("编辑成功");
              this.close();
              this.$emit("refresh");
            });
          } else {
            let params = {
              ...this.form,
            };
            createAPI(params).then((res) => {
              this.$message.success("新增成功");
              this.close();
              this.$emit("refresh");
            });
          }
        }
      });
    },
    // 获取详情
    async getDetail(id) {
      try {
        const res = await getDetailAPI({ id });
        if (res.code === 200) {
          this.form = res.data;
          this.form.category = res.data.category.key;
          this.form.fileType = res.data.fileType.key;
          console.log(this.form);
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    onSuccess(fileList, params) {
      this.form[params]=[];
      this.form[params].push(fileList);
    },
    onRemove(index, params) {
      this.form[params].splice(index, 1);
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}
/deep/ .el-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 22px !important;
}

/deep/ .el-form-item__label-wrap label {
  line-height: 20px;
  // white-space: nowrap;
}

/deep/ .vxe-modal--wrapper .vxe-modal--content {
  padding: 20px 30px;
}
</style>

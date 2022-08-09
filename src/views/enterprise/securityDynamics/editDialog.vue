<template>
  <div>
    <basic-dialog
      :icon="
        isDisabled
          ? 'icon-chakan2'
          : form.id
          ? 'icon-bianji'
          : 'icon-xinzengfabu'
      "
      :title="(isDisabled ? '查看' : form.id ? '编辑' : '新增') + title"
      width="850px"
      height="75%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-form
          label-width="140px"
          label-position="right"
          :model="form"
          :rules="rules"
          ref="formRef"
        >
          <el-row>
              <el-form-item label="安全动态主题" prop="targetName">
                <el-input
                  placeholder="请输入安全动态主题"
                  v-model="form.targetName"
                  :size="size"
                  :isDisabled="isDisabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="动态分类" prop="year">
                <el-select
                  placeholder="动态分类"
                  clearable
                  v-model="form.year"
                  style=width:100%
                  :size="size"
                  :isDisabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.entAccidentType"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="正文" prop="targetName">
                <el-input
                  type="textarea"
                  placeholder="请输入正文"
                  v-model="form.targetName"
                  :size="size"
                  :isDisabled="isDisabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  :size="size"
                  placeholder="备注"
                  clearable
                  :autosize="{ minRows: 10, maxRows: 22 }"
                  v-model="form.remark"
                  resize="none"
                  :isDisabled="isDisabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="附件">
                <basic-upload
                  key="file"
                  :model="true"
                  @onSuccess="(fileList) => onSuccess(fileList, 'file')"
                  @onRemove="(fileList) => onRemove(fileList, 'file')"
                  :photos="form.file"
                ></basic-upload>
              </el-form-item>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('form')"
            >保存
          </el-button>
          <el-button type="success" @click="reset('form')">重置 </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import {
  sdpInfoCreateAPI,
  sdpInfoViewAPI,
  sdpInfoUpdateAPI,
} from "@/api/duty/duty_standard_provide";


export default {
  name: "editDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      width: "260px",
      size: "small",
      form: {
        id: "",
        file:'',
      },
      // rules: {
      //   // 有限空间名称
      //   restrictSpaceName: [
      //     { required: true, message: "请输入有限空间", trigger: "blur" },
      //   ],
      //   // 易导致事故类型
      //   accidentType: [
      //     {
      //       required: true,
      //       message: "请选择易导致事故类型",
      //       trigger: "change",
      //     },
      //   ],
      // },
      rowData: {},
    };
  },
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    title: {
      type: String,
      default: "安全动态信息",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    // 打开
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
      this.isDisabled = type === "chakan" ? true : false;
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id);
      } else {
        this.form={}
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
      this.reset();
    },
    // 重置
    reset() {
      this.$refs.formRef.resetFields();
      this.form = {};
    },
       // 上传图片成功
    onSuccess(fileList, params) {
      this.form[params] = fileList;
    },
    // 删除图片
    onRemove(fileList, params) {
      this.form[params] = fileList;
    },
    // 提交接口
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          if (this.rowData.id) this.modify();
          else this.add();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增
    async add() {
      try {
        // const res = await sdpInfoCreateAPI(this.form);
        // if (res.code === 200) {
        //   this.close();
        //   this.$emit("refresh");
        // }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 修改
    async modify() {
      try {
        // const res = await sdpInfoUpdateAPI({
        //   ...this.form,
        //   id: this.rowData.id,
        // });
        // if (res.code === 200) {
        //   this.close();
        //   this.$emit("refresh");
        // }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取详情
    async getDetail(id) {
      try {
        // const res = await sdpInfoViewAPI({ id });
        // if (res.code === 200) {
        // }
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}
</style>

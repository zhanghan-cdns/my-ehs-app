<template>
  <div>
    <basic-dialog
      icon="icon-xinzeng"
      :title="( '新增') + title"
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
        <div class="title"><i class="iconfont icon-fujiaxinxi" style="color: #3c81e6;margin-right:6px;"></i>审核信息</div>
          <el-row>
              <el-form-item label="审核意见" prop="content">
                <el-input
                  type="textarea"
                  placeholder="请输入审核意见"
                  v-model="form.content"
                  :size="size"
                ></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                      <el-form-item label="审核结果">
                            <el-radio-group v-model="form.resource">
                            <el-radio label="通过"></el-radio>
                            <el-radio label="不通过"></el-radio>
                            </el-radio-group>
                       </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="积分" prop="person">
                    <el-input
                      placeholder="请输入积分"
                      v-model="form.person"
                      :size="size"
                    ></el-input>
                </el-form-item>
                </el-col>
              </el-row>
            <div class="title"><i class="iconfont icon-jichuxinxi1" style="color: #3c81e6;margin-right:6px;"></i>合理化建议</div>
            <el-form-item label="主题" prop="theme">
                <el-input
                  placeholder="请输入主题"
                  v-model="form.theme"
                  :size="size"
                  :isDisabled="isDisabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="内容" prop="content">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="form.content"
                  :size="size"
                  :isDisabled="isDisabled"
                ></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="类别" prop="category">
                    <el-select
                      placeholder="请输入类别"
                      clearable
                      v-model="form.category"
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
                </el-col>
                <el-col :span="12">
                  <el-form-item label="建言人" prop="person">
                    <el-input
                      placeholder="请输入建言人"
                      v-model="form.person"
                      :size="size"
                      :isDisabled="isDisabled"
                    ></el-input>
                </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="附件">
                <basic-upload
                  key="file"
                  :model="true"
                  @onSuccess="(fileList) => onSuccess(fileList, 'file')"
                  @onRemove="(fileList) => onRemove(fileList, 'file')"
                  :photos="form.file"
                ></basic-upload>
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
  name: "auditDialog",
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
      rules: {
      },
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
      default: "审核信息",
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
      this.form.id = row.id;
      this.isDisabled = type === "shenpi" ? true : false;
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
.title{
    margin-left:20px;
    font-weight: bold;
}
</style>

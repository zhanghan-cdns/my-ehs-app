<template>
  <div>
    <basic-dialog
      icon="icon-xinzengfabu"
      :title="'查看' + title"
      width="800px"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="form">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="110px"
            class="demo-ruleForm"
          >
            <el-form-item label="承包商(多选)" prop="contractor">
              <el-input
                v-model="ruleForm.contractor"
                disabled
                placeholder="承包商信息"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目类型" prop="projectType">
              <el-input
                v-model="ruleForm.projectType"
                disabled
                placeholder="项目类型"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目名称" prop="projectName">
              <el-input
                v-model="ruleForm.projectName"
                disabled
                placeholder="项目名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="服务项目内容" prop="projectcContent">
              <el-input
                v-model="ruleForm.projectcContent"
                disabled
                placeholder="服务项目内容"
                type="textarea"
              ></el-input>
            </el-form-item>

            <el-row>
              <el-col :span="12">
                <el-form-item label="开始时间" prop="starttime">
                  <el-input
                    v-model="ruleForm.starttime"
                    disabled
                    placeholder="开始时间"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束时间" prop="endtime">
                  <el-input v-model="ruleForm.endtime" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="项目负责人" prop="name">
                  <el-input v-model="ruleForm.name" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="项目合同资金(万元)"
                  style="line-height: 20px"
                  class="projectFund"
                  prop="projectFund"
                >
                  <el-input v-model="ruleForm.projectFund" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="商务合同">
              <div class="hetong">
                <i class="iconfont icon-word"></i> 商务合同
              </div>
            </el-form-item>
            <el-form-item label="安全合同">
              <div class="hetong"><i class="iconfont icon-word"></i>安全合同</div>
            </el-form-item>
            <el-form-item label="施工方案">
              <div class="hetong"><i class="iconfont icon-word"></i>施工方案</div>
            </el-form-item>
            <el-form-item label="技术措施">
              <div class="hetong"><i class="iconfont icon-word"></i>技术措施</div>
            </el-form-item>
            <el-form-item label="备注" prop="note">
              <el-input v-model="ruleForm.note" disabled></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
export default {
  name: "toviewDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      ruleForm: {
        contractor: "",
        projectType: "",
        projectName: "",
        projectcContent: "",
        starttime: "",
        endtime: "",
        name: "",
        projectFund: "",
        note: "",
        test: "",
      },
    };
  },
  components: {},
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    title: {
      type: String,
      default: "项目信息",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
      this.isDisabled = type === "chakan" ? true : false;
      if (row && row.id) {
        this.rowData = row;
      } else {
        this.form = {};
      }
    },

    // 关闭
    close() {
      this.openEdit = false;
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  padding: 20px;
}
/deep/.projectFund .el-form-item__label {
  line-height: 20px;
}
/deep/ .el-form-item__error {
  padding-top: 0;
}
.el-upload-dragger .el-upload__text {
  margin-top: -40px;
}
/deep/ .el-form-item {
  margin-bottom: 15px;
}
.hetong {
  cursor: pointer;
  color: #4a80fc;
  border: 1px dashed #4a80fc;
  border-radius: 4px;
  width: 20%;
  text-align: center;
}
 .icon-word{
  font-size: 13px;
  margin-right: 10px;
  
}
</style>

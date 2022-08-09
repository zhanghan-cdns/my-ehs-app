<template>
  <div>
    <basic-dialog
      icon="icon-xinzengfabu"
      :title="title"
      width="900px"
      height="90%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <header-button @headerButtonClick="headerButtonMethods" />
      <template #content>
        <div class="recordsForm">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="140px"
            class="demo-ruleForm"
          >
            <!-- 演练名称 -->
            <el-form-item label="演练名称" prop="name">
              <el-select style="width: 100%" v-model="ruleForm.name" disabled>
                <el-option value="1">1</el-option>
              </el-select>
            </el-form-item>
            <el-row>
              <!-- 应急演练评价编号 -->
              <el-col :span="12">
                <el-form-item
                  class="spical"
                  :label="'应急演练\n评价编号'"
                  prop="num"
                >
                  <el-select
                    style="width: 100%"
                    v-model="ruleForm.num"
                    disabled
                  >
                    <el-option value="1">1</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 实际演练日期 -->
              <el-col :span="12">
                <el-form-item label="实际演练日期" prop="date">
                  <el-date-picker
                    v-model="ruleForm.date"
                    type="date"
                    style="width: 100%"
                    disabled
                  >
                    <el-option value="1">1</el-option>
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <!-- 演练实施人员 -->
              <el-col :span="12">
                <el-form-item label="演练实施人员" prop="drill">
                  <el-select
                    disabled
                    style="width: 100%"
                    v-model="ruleForm.drill"
                    placeholder="多选"
                  >
                    <el-option value="1">1</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 主要参演人员 -->
              <el-col :span="12">
                <el-form-item label="主要参演人员" prop="main">
                  <el-select
                    style="width: 100%"
                    v-model="ruleForm.main"
                    placeholder="多选"
                    disabled
                  >
                    <el-option value="1">1</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 其他参演部门 -->
              <el-col :span="12">
                <el-form-item label="其他参演部门" prop="other">
                  <el-select
                    style="width: 100%"
                    v-model="ruleForm.other"
                    placeholder="多选"
                    disabled
                  >
                    <el-option value="1">1</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 演练内容 -->
            <el-form-item label="演练内容" prop="content">
              <el-input
                v-model="ruleForm.content"
                type="textarea"
                :autosize="{ minRows: 3 }"
                disabled
              ></el-input>
            </el-form-item>
            <!-- 演练目的 -->
            <el-form-item label="演练目的" prop="training">
              <el-input
                disabled
                v-model="ruleForm.training"
                type="textarea"
                :autosize="{ minRows: 3 }"
              ></el-input>
            </el-form-item>
            <!-- 演练过程 -->
            <el-form-item label="演练过程" prop="process">
              <el-input
                disabled
                v-model="ruleForm.process"
                type="textarea"
                :autosize="{ minRows: 3 }"
              ></el-input>
            </el-form-item>
            <!-- 演练小结 -->
            <el-form-item label="演练小结" prop="practice">
              <el-input
                disabled
                v-model="ruleForm.practice"
                type="textarea"
                :autosize="{ minRows: 3 }"
              ></el-input>
            </el-form-item>
            <!-- 不足因素描述 -->
            <el-form-item label="不足因素描述" prop="factors">
              <el-input
                disabled
                v-model="ruleForm.factors"
                type="textarea"
                :autosize="{ minRows: 3 }"
              ></el-input>
            </el-form-item>
            <el-row>
              <!-- 是否整改 -->
              <el-col :span="12">
                <el-form-item label="是否整改" prop="rectification">
                  <el-radio v-model="ruleForm.rectification" label="1"
                    >是</el-radio
                  >
                  <el-radio v-model="ruleForm.rectification" label="2"
                    >否</el-radio
                  >
                </el-form-item>
              </el-col>
              <!-- 评价状态 -->
              <el-col :span="12">
                <el-form-item label="评价状态" prop="Evaluationstate">
                  <el-radio v-model="ruleForm.Evaluationstate" label="1"
                    >评价中</el-radio
                  >
                  <el-radio v-model="ruleForm.Evaluationstate" label="2"
                    >已评价</el-radio
                  >
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 评价意见 -->
            <el-form-item label="评价意见" prop="opinions">
              <el-input
                disabled
                v-model="ruleForm.opinions"
                type="textarea"
                :autosize="{ minRows: 3 }"
              ></el-input>
            </el-form-item>
            <!-- 附件 -->
            <el-form-item label="附件">
              <div class="hetong">
                <i class="iconfont icon-word"></i>FT2022-应急演练评价
              </div>
            </el-form-item>
            <!-- 备注 -->
            <el-form-item label="备注" prop="attachment">
              <el-input
                disabled
                v-model="ruleForm.attachment"
                type="textarea"
                :autosize="{ minRows: 3 }"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  name: "addDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      ruleForm: {
        name: "",
        num: "",
        date: "",
        drill: "",
        main: "",
        other: "",
        content: "",
        training: "",
        process: "",
        practice: "",
        factors: "",
        rectification: "1",
        Evaluationstate: "1",
        opinions: "",
        attachment: "",
      },
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
      default: "查看应急演练评价信息",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "添加应急演练评价信息";
        this.isDisabled = false;
      } else if (type == "bianji") {
        this.isEditId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑查看演练计划信息";
        this.isDisabled = false;
      }
      this.openEdit = true;
    },
    close() {
      this.openEdit = false;
    },
  },
  resetForm() {
    this.$refs.ruleForm.resetFields();
  },
};
</script>

<style scoped lang="scss">
.el-upload__text {
  margin-top: -40px;
}
.hetong {
  cursor: pointer;
  color: #4a80fc;
  border: 1px dashed #4a80fc;
  border-radius: 4px;
  width: 25%;
  text-align: center;
}
/deep/ .el-form-item__error {
  padding-top: 0;
}
/deep/ .el-form {
  padding: 20px 40px 0 10px;
}
/deep/.spical .el-form-item__label {
  line-height: 20px;
}
</style>

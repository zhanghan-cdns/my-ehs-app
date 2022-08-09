<template>
  <div>
    <basic-dialog
      icon="icon-xinzengfabu"
      title="相关方评定"
      width="950px"
      height="75%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content
        ><el-form
          label-width="130px"
          label-position="right"
          :model="form"
          :rules="rules"
          ref="formRef"
          :disabled="isDisabled"
        >
          <el-row>
            <el-col span="12">
              <el-form-item label="标题" prop="editor">
                <el-input
                  placeholder="标题"
                  clearable
                  v-model="form.editor"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="被考核相关方" prop="job">
                <el-select
                  placeholder="被考核相关方"
                  clearable
                  v-model="form.job"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="yearChange"
                >
                  <el-option
                    v-for="item in jobList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.jobName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row span="24">
            <el-col>
              <table-dialog @refresh="upTable"></table-dialog>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="得分" prop="editor">
                <el-input
                  placeholder="得分"
                  clearable
                  v-model="form.editor"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="true"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="评定等级" prop="level">
                <el-input
                  placeholder="评定等级"
                  clearable
                  v-model="form.level"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="true"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="考核结果">
                <el-radio-group v-model="form.qualified">
                  <el-radio label="0">合格相关方</el-radio>
                  <el-radio label="1">不合格相关方</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div class="title">
              <i
                class="iconfont icon-fujiaxinxi"
                style="font-size: 16px; color: #1b8afc"
              ></i
              ><span>评定信息</span>
            </div>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="考核部门" prop="job">
                <el-select
                  placeholder="考核部门"
                  clearable
                  v-model="form.job"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="yearChange"
                >
                  <el-option
                    v-for="item in jobList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.jobName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="考核日期" prop="assessDate">
                <el-date-picker
                  v-model="form.assessDate"
                  type="date"
                  placeholder="选择考核日期"
                  :style="`width:${width}`"
                  :size="size"
                  :formatter="dateFormat"
                  value-format="yyyy-MM-dd"
                  :disabled="isDisabled"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="审批前类别" prop="editor">
                <el-input
                  placeholder="审批前类别"
                  clearable
                  v-model="form.editor"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="审批认定类别" prop="editor">
                <el-input
                  placeholder="审批认定类别"
                  clearable
                  v-model="form.editor"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="相关方所在厂区" prop="editor">
                <el-input
                  placeholder="相关方所在厂区"
                  clearable
                  v-model="form.editor"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="相关方在厂状态" prop="editor">
                <el-input
                  placeholder="相关方在厂状态"
                  clearable
                  v-model="form.editor"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="备注">
                <el-input
                  placeholder="备注"
                  clearable
                  v-model="form.remark"
                  style="width: 92%"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button
            type="primary"
            @click="submitForm('form')"
            v-if="!isDisabled"
            >保存
          </el-button>
          <el-button type="success" @click="reset('form')" v-if="!isDisabled"
            >重置
          </el-button>
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
} from "@/api/incidentmanagement/accidentexpress/index";
import { imgUrl } from "@/router/axios";
import tableDialog from "./tableDialog.vue";

export default {
  name: "editDialog",
  components: {
    tableDialog,
  },
  data() {
    return {
      openEdit: false,
      IMG_URL: imgUrl,
      isDisabled: "",
      width: "260px",
      size: "small",
      sizeCon: {
        height: "300px",
      },
      tableData: [{ job: "供应商" }],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "job",
          title: "相关方类别",
          align: "center",
        },
        {
          field: "safetyDuty",
          title: "评定内容",
          align: "center",
        },
        {
          field: "editor",
          title: "描述",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row }) => {
            return (
              <operate-button
                operateButtonList={this.operateButtonListassessment}
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          },
        },
      ],
      operateButtonListassessment: ["bianji", "shanchu"],
      form: {
        id: "",
        editor: "", //得分
        level: "", //等级
        qualified:"",//考核结果
      },
      rules: {
        editor: [{ required: true, message: "请输入标题", trigger: "blur" }],
        job: [
          { required: true, message: "请选择被考核相关方", trigger: "blur" },
        ],
      },
      rowData: {},
      page: {
        currentPage: 1,
        pageSize: 10,
      },
      jobList: [],
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
      default: "指标配备",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  created() {},
  methods: {
    // 打开
    open(row, type) {
      this.openEdit = true;
      this.isDisabled = type === "chakan" ? true : false;
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id);
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
        const res = await sdpInfoCreateAPI(this.form);
        if (res.code === 200) {
          this.$message.success("保存成功");
          this.close();
          this.$emit("refresh");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 修改
    async modify() {
      try {
        const res = await sdpInfoUpdateAPI({
          ...this.form,
          id: this.rowData.id,
        });
        if (res.code === 200) {
          this.$message.success("编辑成功");
          this.close();
          this.$emit("refresh");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取详情
    async getDetail(id) {
      try {
        const res = await sdpInfoViewAPI({ id });
        if (res.code === 200) {
          this.form = {
            ...res.data,
          };
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取平均得分
    upTable(data) {
      if (data == '0') {
        this.form.editor = "0";
        this.form.level = "不合格";
        this.form.qualified = '1'
      } else {
        this.form.editor = data;
        if (data >= 90) {
          this.form.level = "优秀";
          this.form.qualified = '0'
        } else if (data >= 75 && data <= 85) {
          this.form.level = "良好";
          this.form.qualified = '0'
        } else if (data > 60 && data <= 75) {
          this.form.level = "合格";
          this.form.qualified = '0'
        } else if (data <= 60) {
          this.form.level = "不合格";
          this.form.qualified = '1'
        }
       }
    },
  },
};
</script>

<style scoped lang="scss">
.content-btn {
  display: flex;
  justify-content: right;
  padding: 10px 0px;
}
.title {
  height: 40px;
  line-height: 40px;
  padding: 0px 40px 5px 40px;
  font-size: 16px;
  span {
    padding: 0px 5px;
  }
}
</style>

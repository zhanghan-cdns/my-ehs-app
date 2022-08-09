<template>
  <div>
    <basic-dialog
      icon="icon-xinzengfabu"
      title="评定内容设置"
      width="850px"
      height="75%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content
        ><el-form
          label-width="140px"
          label-position="right"
          :model="form"
          :rules="rules"
          ref="formRef"
          :disabled="isDisabled"
        >
          <el-row>
            <el-col span="12">
              <el-form-item label="相关方类别" prop="job">
                <el-select
                  placeholder="相关方类别"
                  clearable
                  v-model="form.job"
                  style="width: 98.5%"
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
          <el-row>
            <el-col span="24">
              <el-form-item label="评定内容" prop="safetyDuty">
                <el-input
                  placeholder="评定内容"
                  clearable
                  v-model="form.safetyDuty"
                  style="width: 98.5%"
                  :autosize="{ minRows: 4, maxRows: 8 }"
                  type="textarea"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="描述" prop="safetyDuty">
                <el-input
                  placeholder="描述"
                  clearable
                  v-model="form.safetyDuty"
                  style="width: 98.5%"
                  :autosize="{ minRows: 4, maxRows: 8 }"
                  type="textarea"
                  :disabled="isDisabled"
                  resize="none"
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

export default {
  name: "editDialog",
  components: {
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
        targetName: "", //指标名称
      },
      rules: {
        job: [{ required: true, message: "请选择相关方类别", trigger: "blur" }],
        safetyDuty: [
          { required: true, message: "请选择描述", trigger: "blur" },
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
          this.pdfName = res.data.attachment[0].originalFilename;
          this.pdfUrl = res.data.attachment[0].url;
        }
      } catch (e) {
        this.$message.error(e);
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
</style>

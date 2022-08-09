<template>
  <div>
    <basic-dialog
      :openFlag="openEdit"
      height="55%"
      icon="13"
      title="分险对象"
      v-bind="$attrs"
      width="850px"
      @close="close"
    >
      <template #content>
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="right"
          label-width="140px"
        >
          <el-row>
            <el-col :span="12">
              <el-form :form="form" label-width="140px">
                <el-form-item label="编号" prop="number">
                  <el-input
                    v-model="form.number"
                    :isDisabled="isDisabled"
                    :size="size"
                    :style="`width:${width}`"
                    clearable
                    placeholder="编号"
                  ></el-input>
                </el-form-item>

                <el-form-item label="风险分析对象名称" prop="name">
                  <el-input
                    v-model="form.name"
                    :isDisabled="isDisabled"
                    :size="size"
                    :style="`width:${width}`"
                    clearable
                    placeholder="风险分析对象名称"
                  ></el-input>
                </el-form-item>

                <el-form-item label="类型" prop="riskAnalysisObjectType">
                  <el-select
                    v-model="form.riskAnalysisObjectType"
                    :isDisabled="isDisabled"
                    :size="size"
                    :style="`width:${width}`"
                    clearable
                    placeholder="类型"
                  >
                    <el-option
                      v-for="item in dictConfig.doublePreventionRiskAnalysisObjectType"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="责任部门" prop="responsibleDepartmentId">
                  <el-select
                    v-model="form.responsibleDepartmentId"
                    :isDisabled="isDisabled"
                    :size="size"
                    :style="`width:${width}`"
                    clearable
                    placeholder="责任部门"
                  >
                    <el-option
                      v-for="item in departmentList"
                      :key="item.id"
                      :label="item.deptName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="责任人" prop="responsiblePersonId">
                  <el-select
                    v-model="form.responsiblePersonId"
                    :isDisabled="isDisabled"
                    :size="size"
                    :style="`width:${width}`"
                    clearable
                    placeholder="责任人"
                  >
                    <el-option
                      v-for="item in userList"
                      :key="item.id"
                      :label="item.entPersonName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="区域" prop="riskAreaid">
                  <el-select
                    v-model="form.riskAreaid"
                    :isDisabled="isDisabled"
                    :size="size"
                    :style="`width:${width}`"
                    clearable
                    placeholder="区域"
                  >
                    <el-option
                      v-for="item in areaList"
                      :key="item.id"
                      :label="item.areaName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="备注">
                  <el-input
                    v-model="form.remark"
                    :isDisabled="isDisabled"
                    :rows="3"
                    :size="size"
                    :style="`width:${width}`"
                    clearable
                    placeholder="备注"
                    type="textarea"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12">
              <div style="text-align: right; margin-bottom: 5px">
                <el-button size="small" type="primary" @click="addCreate">
                  <i class="iconfont icon-jia" style="font-size: 13px"></i>
                  新增
                </el-button>
              </div>
              <render-table
                :columns="columns"
                :data="form.riskAnalysisUnits"
                :height="sizeCon.height"
              />
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('form')"
          >保存
          </el-button>
          <el-button type="success" @click="reset('form')">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
    <unit-Info
      ref="unitDialogRef"
      :dictConfig="dictConfig"
      :tableData="form.riskAnalysisUnits"
      @refresh="tableDateBtn"
    ></unit-Info>
  </div>
</template>
<script>
import {
  deptAPI,
  objectInfoCreateAPI,
  objectInfoUpdateAPI,
  objectInfoViewAPI,
  riskAreaAPI,
  userAPI,
} from "@/api/doubleprevention/riskobject/index.js";
import unitInfo from "./unitInfo.vue";
import dictMixin from "@/mixins/dict";

export default {
  name: "editDialog",
  mixins: [dictMixin],
  components: {
    unitInfo,
  },
  data() {
    return {
      sizeCon: {
        height: "90%",
      },
      tableData: [],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "unitName",
          title: "风险分析单元名称",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, {row, column, $index}) => {
            return (
              <operate-button
                operateButtonList={this.operateButtonList}
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          },
        },
      ],
      operateButtonList: ["chakan", "bianji", "shanchu"],
      openEdit: false,
      isDisabled: "",
      width: "260px",
      size: "small",
      form: {
        id: "",
        riskAnalysisUnits: [],
        riskAnalysisObjectStatus:
          "DOUBLE_PREVENTION_RISK_ANALYSIS_OBJECT_STATUS:NORMAL",
      },
      rules: {
        // 有限空间名称
        number: [{required: true, message: "请输入", trigger: "blur"}],
        name: [{required: true, message: "请输入", trigger: "blur"}],
        riskAnalysisObjectType: [
          {required: true, message: "请输入", trigger: "blur"},
        ],
        responsibleDepartmentId: [
          {required: false, message: "请输入", trigger: "blur"},
        ],
        responsiblePersonId: [
          {required: false, message: "请输入", trigger: "blur"},
        ],
        riskAreaid: [{required: false, message: "请输入", trigger: "blur"}],
        targetName: [{required: false, message: "请输入", trigger: "blur"}],
        targetType: [{required: false, message: "请输入", trigger: "blur"}],
        year: [{required: false, message: "请输入", trigger: "blur"}],
      },
      rowData: {},
      departmentList: [],
      userList: [],
      areaList: [],
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
  watch: {},
  methods: {
    // 打开
    open(row, type) {
      this.openEdit = true;
      // 每次新增清空数据源
      this.deptList(); //责任部门
      this.personList(); //责任人
      this.riskAreaList(); //风险区域
      this.isDisabled = type === "chakan";
      if (row && row.id) {
        this.form.id = row.id;
        this.rowData = row;
        this.getDetail(row.id);
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
      this.reset()
    },
    // 重置
    reset() {
      this.$refs.formRef.resetFields();
      this.form = {
        riskAnalysisUnits: [],
        riskAnalysisObjectStatus:
          "DOUBLE_PREVENTION_RISK_ANALYSIS_OBJECT_STATUS:NORMAL",
      };
    },
    async deptList() {
      //责任部门
      const res = await deptAPI();
      if (res.code === 200) {
        this.departmentList = res.data;
      }
    },
    // 责任人
    async personList() {
      //责任部门
      const res = await userAPI();
      if (res.code === 200) {
        this.userList = res.data;
      }
    },
    //风险分区-区域
    async riskAreaList() {
      //责任部门
      const res = await riskAreaAPI();
      if (res.code === 200) {
        this.areaList = res.data;
      }
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
        if (this.form.riskAnalysisUnits.length === 0) {
          this.$message.error("请新增单元");
        } else {
          const res = await objectInfoCreateAPI({
            ...this.form,
            riskAnalysisUnits: this.form.riskAnalysisUnits.map(item => ({
              unitName: item.unitName,
              riskType: item.riskType,
              accidentType: item.accidentType,
              remark: item.remark,
            })),
          });
          if (res.code === 200) {
            this.close();
            this.$emit("refresh");
          }
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 修改
    async modify() {
      try {
        const res = await objectInfoUpdateAPI({
          ...this.form,
          riskAnalysisUnits: this.form.riskAnalysisUnits.map(item => ({
            unitName: item.unitName,
            riskType: item.riskType,
            accidentType: item.accidentType,
            remark: item.remark,
          })),
          id: this.rowData.id,
        });
        if (res.code === 200) {
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
        const res = await objectInfoViewAPI({id});
        if (res.code === 200) {
          this.form = res.data;
          this.form.riskAnalysisObjectType = res.data.riskAnalysisObjectType
            ? res.data.riskAnalysisObjectType.key
            : "";
          this.form.riskAnalysisUnits = res.data.riskAnalysisUnits;
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 对象下的单元格
    addCreate() {
      this.$refs.unitDialogRef.open();
    },
    operateButtonClick(type, row) {
      console.log(row, 'row')
      switch (type) {
        case "chakan":
          this.$refs.unitDialogRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.unitDialogRef.open(row, type);
          break;
        case "shanchu":
          this.form.riskAnalysisUnits.forEach((item, index) => {
            if (item.id === row.id) {
              this.form.riskAnalysisUnits.splice(index,1)
            }
          })
          break;
      }
    },
    tableDateBtn(val) {
      // 判断当前table中是否已经存在数据
      let exist = this.form.riskAnalysisUnits.some(item => item.id === val[0].id)
      // 如果存在就修改，不存在就新增
      if (exist) {
        this.form.riskAnalysisUnits.forEach(item => {
          if (item.id === val[0].id) {
            item.accidentType = val[0].accidentType
            item.id = val[0].id
            item.remark = val[0].remark
            item.unitName = val[0].unitName
          }
        })
      } else {
        this.$set(this.form, 'riskAnalysisUnits', [...this.form.riskAnalysisUnits, ...val])
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}
</style>

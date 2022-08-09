<template>
  <div>
    <basic-dialog
      icon="13"
      title="执行"
      width="950px"
      height="85%"
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
          <el-form-item label="排查结果" prop="riskAreaid">
            <el-radio-group v-model="radio">
              <el-radio
                label="DOUBLE_PREVENTION_RISK_TROUBLESHOOTING_RESULTS:NORMAL"
                >正常</el-radio
              >
              <el-radio
                label="DOUBLE_PREVENTION_RISK_TROUBLESHOOTING_RESULTS:HIDDEN_DANGERS"
                >存在隐患</el-radio
              >
              <el-radio
                label="DOUBLE_PREVENTION_RISK_TROUBLESHOOTING_RESULTS:NOT_CHECKED"
                >未排查</el-radio
              >
              <el-radio
                label="DOUBLE_PREVENTION_RISK_TROUBLESHOOTING_RESULTS:OTHER"
                >其他</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="照片">
            <basic-upload
              key="picture"
              @onSuccess="fileList => onSuccess(fileList, 'enclosurePhoto')"
              @onRemove="fileList => onRemove(fileList, 'enclosurePhoto')"
              :photos="form.enclosurePhoto"
            ></basic-upload>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              placeholder="备注"
              clearable
              v-model="form.checkValue"
              style="width: 94%"
              :size="size"
              :isDisabled="isDisabled"
              :autosize="{ minRows: 2, maxRows: 16 }"
              type="textarea"
              resize="none"
            ></el-input>
          </el-form-item>

          <div v-show=" radio === 'DOUBLE_PREVENTION_RISK_TROUBLESHOOTING_RESULTS:HIDDEN_DANGERS'">
            <div style="
              border-bottom: 1px solid #4a80fc;
              height: 30px;
              margin: 0px 15px 15px 25px;
            ">
              <span
                style="
                width: 2px;
                height: 5px;
                background: #4a80fc;
                border-left: 2px solid #4a80fc;
                margin-right: 7px;
              "
              ></span
              >隐患信息
            </div>

            <el-row>
              <el-col span="12">
                <el-form-item label="隐患来源" prop="riskAnalysisUnitId">
                  <el-select
                    placeholder="请选择隐患来源"
                    clearable
                    v-model="form.riskAnalysisUnitId"
                    :style="`width:${width}`"
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
              <el-col span="12">
                <el-form-item label="风险分析单元" prop="riskAnalysisUnitId">
                  <el-select
                    placeholder="请选择分析单元"
                    clearable
                    v-model="form.riskAnalysisUnitId"
                    :style="`width:${width}`"
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
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="隐患名称(整改标题)" prop="riskEventName">
                  <el-input
                    placeholder="隐患名称(整改标题)"
                    v-model="form.riskEventName"
                    style="width:92%"
                    :size="size"
                    :isDisabled="isDisabled"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="治理类型" prop="riskAnalysisUnitId">
                  <el-select
                    placeholder="请选择治理类型"
                    clearable
                    v-model="form.riskAnalysisUnitId"
                    :style="`width:${width}`"
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
              <el-col span="12">
                <el-form-item label="隐患类型" prop="riskAnalysisUnitId">
                  <el-select
                    placeholder="请选择隐患类型"
                    clearable
                    v-model="form.riskAnalysisUnitId"
                    :style="`width:${width}`"
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
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="隐患发现时间" prop="finishTime">
                  <el-date-picker
                    v-model="form.finishTime"
                    type="date"
                    placeholder="选择隐患发现时间"
                    :style="`width:${width}`"
                    :formatter="dateFormat"
                    value-format="yyyy-MM-dd"
                    :isDisabled="isDisabled"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="隐患治理期限" prop="finishTime">
                  <el-date-picker
                    v-model="form.finishTime"
                    type="date"
                    placeholder="选择隐患治理期限"
                    :style="`width:${width}`"
                    :formatter="dateFormat"
                    value-format="yyyy-MM-dd"
                    :isDisabled="isDisabled"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <div style="display:flex">
                  <el-form-item
                    label="检查人员"
                    prop="inspectorName"
                    class="is-required"
                  >
                    <el-input
                      style="width: 220px"
                      clearable
                      v-model="form.inspectorName"
                      disabled
                      placeholder="请输入检查人员"
                    ></el-input>
                  </el-form-item>
                  <el-button
                    style="margin-left: 10px;height: 40px"
                    type="primary"
                    icon="el-icon-plus"
                    @click="
                      () => {
                        $refs.choosePersonDialogRef.open();
                      }
                    "
                    >请选择
                  </el-button>
                </div>
              </el-col>
              <el-col span="12">
                <el-form-item
                  label="检查单位"
                  prop="inspectionDepartmentId"
                  class="is-required"
                >
                  <el-select
                    placeholder="请选择检查单位"
                    clearable
                    v-model="form.riskAnalysisUnitId"
                    :style="`width:${width}`"
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
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="整改责任人" prop="riskAnalysisUnitId">
                  <el-select
                    placeholder="请选择整改责任人"
                    clearable
                    v-model="form.riskAnalysisUnitId"
                    :style="`width:${width}`"
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
              <el-col span="12">
                <el-form-item label="隐患因素" prop="riskAnalysisUnitId">
                  <el-select
                    placeholder="请选择隐患因素"
                    clearable
                    v-model="form.riskAnalysisUnitId"
                    :style="`width:${width}`"
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
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="整改责任单位" prop="riskAnalysisUnitId">
                  <el-select
                    placeholder="请选择整改责任单位"
                    clearable
                    v-model="form.riskAnalysisUnitId"
                    :style="`width:${width}`"
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
              <el-col span="12">
                <el-form-item
                  label="整改责任单位负责人"
                  prop="riskAnalysisUnitId"
                >
                  <el-select
                    placeholder="请选择整改责任单位负责人"
                    clearable
                    v-model="form.riskAnalysisUnitId"
                    :style="`width:${width}`"
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
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="计划整改完成日期" prop="finishTime">
                  <el-date-picker
                    v-model="form.finishTime"
                    type="date"
                    placeholder="选择计划整改完成日期"
                    :style="`width:${width}`"
                    :formatter="dateFormat"
                    value-format="yyyy-MM-dd"
                    :isDisabled="isDisabled"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="验收人" prop="riskAnalysisUnitId">
                  <el-select
                    placeholder="请选择验收人"
                    clearable
                    v-model="form.riskAnalysisUnitId"
                    :style="`width:${width}`"
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
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="隐患描述" prop="checkValue">
                  <el-input
                    placeholder="隐患描述"
                    clearable
                    v-model="form.checkValue"
                    style="width: 94%"
                    :size="size"
                    :isDisabled="isDisabled"
                    :autosize="{ minRows: 2, maxRows: 16 }"
                    type="textarea"
                    resize="none"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="原因分析" prop="checkValue">
                  <el-input
                    placeholder="原因分析"
                    clearable
                    v-model="form.checkValue"
                    style="width: 94%"
                    :size="size"
                    :isDisabled="isDisabled"
                    :autosize="{ minRows: 2, maxRows: 16 }"
                    type="textarea"
                    resize="none"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="控制措施" prop="checkValue">
                  <el-input
                    placeholder="控制措施"
                    clearable
                    v-model="form.checkValue"
                    style="width: 94%"
                    :size="size"
                    :isDisabled="isDisabled"
                    :autosize="{ minRows: 2, maxRows: 16 }"
                    type="textarea"
                    resize="none"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="照片">
              <basic-upload
                key="picture"
                @onSuccess="fileList => onSuccess(fileList, 'enclosurePhoto')"
                @onRemove="fileList => onRemove(fileList, 'enclosurePhoto')"
                :photos="form.enclosurePhoto"
              ></basic-upload>
            </el-form-item>
          </div>
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
    <choose-dialog
      ref="choosePersonDialogRef"
      title="选择员工"
      @submit="choosePerson"
    ></choose-dialog>
  </div>
</template>
<script>
import dictMixin from "@/mixins/dict";
import chooseDialog from "@views/components/chooseDialog";
export default {
  name: "editDialog",
  mixins: [dictMixin],
  components: {
    chooseDialog
  },
  data() {
    return {
      sizeCon: {
        height: "260"
      },
      tableData: [],
      radio: "DOUBLE_PREVENTION_RISK_TROUBLESHOOTING_RESULTS:NORMAL",
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center"
        },
        {
          field: "unitName",
          title: "风险分析单元名称",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row, column, $index }) => {
            return (
              <operate-button
                operateButtonList={this.operateButtonList}
                on-operateButtonClick={type => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          }
        }
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
          "DOUBLE_PREVENTION_RISK_ANALYSIS_OBJECT_STATUS:NORMAL"
      },
      rules: {
        // 有限空间名称
        number: [{ required: true, message: "请输入", trigger: "blur" }],
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        riskAnalysisObjectType: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        responsibleDepartmentId: [
          { required: false, message: "请输入", trigger: "blur" }
        ],
        responsiblePersonId: [
          { required: false, message: "请输入", trigger: "blur" }
        ],
        riskAreaid: [{ required: false, message: "请输入", trigger: "blur" }],
        targetName: [{ required: false, message: "请输入", trigger: "blur" }],
        targetType: [{ required: false, message: "请输入", trigger: "blur" }],
        year: [{ required: false, message: "请输入", trigger: "blur" }]
      },
      rowData: {},
      departmentList: [],
      userList: [],
      areaList: []
    };
  },
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      }
    },
    title: {
      type: String,
      default: "指标配备"
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu"
    }
  },
  watch: {
    tableData: {
      handler(val, oldVal) {
        this.tableDate = [];
        this.$nextTick(() => {
          this.tableDateBtn(val, oldVal);
        });
      }
    }
  },
  mounted() {},
  methods: {
    // 打开
    open(row, type) {
      this.openEdit = true;
      this.isDisabled = type === "chakan";
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id);
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
      this.reset();
      this.tableData = [
        {
          title: "",
          unitName: "",
          riskType: "",
          accidentType: [],
          remark: ""
        }
      ];
      this.form.riskAnalysisUnits = [];
    },

    reset() {
      this.$refs.formRef.resetFields();
      this.form.enclosurePhoto = {};
    },

    // 上传图片成功
    onSuccess(fileList, params) {
      this.form[params] = fileList;
    },
    // 删除图片
    onRemove(fileList, params) {
      this.form[params] = fileList;
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
    async riskareaList() {
      //责任部门
      const res = await riskAreaAPI();
      if (res.code === 200) {
        this.areaList = res.data;
      }
    },
    // 提交接口
    submitForm() {
      this.$refs.formRef.validate(valid => {
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
        if (this.form.riskAnalysisUnits.length == 0) {
          this.$message.error("请新增单元");
        } else {
          const res = await objectInfoCreateAPI(this.form);
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
          id: this.rowData.id
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
        const res = await objectInfoViewAPI({ id });
        if (res.code === 200) {
          this.form = res.data;
          this.form.riskAnalysisObjectType = res.data.riskAnalysisObjectType
            ? res.data.riskAnalysisObjectType.key
            : "";
          this.form.riskAnalysisUnits = res.data.riskAnalysisUnits;
          this.tableData = this.form.riskAnalysisUnits;
          console.log(this.tableData, "jk");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 对象下的单元格
    addCreate() {
      this.$refs.unitDialogRef.open();
      // 每次新增清空数据源
      this.tableData = [];
      this.form.riskAnalysisUnits = [];
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.unitDialogRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.unitDialogRef.open(row, type);
          break;
        case "shanchu":
          this.deleteData(row);
          break;
      }
    },
    //单元格数据
    // async getTableData({ query, domain }) {
    //   let params = {
    //     "queryParams[pageNum]": this.page.currentPage,
    //     "queryParams[pageSize]": this.page.pageSize,
    //     ...domain,
    //   };
    //   query ? (params = { ...params, ...query }) : params;
    //   const res = await adpInfoListAPI(params);
    //   if (res.code === 200) {
    //     this.tableData = res.data.content;
    //     this.page.totalResult = res.data.totalElements;
    //     this.page.currentPage = res.data.totalPages;
    //   }
    // },
    tableDateBtn(val, oldVal) {
      this.tableData = val;
      this.form.riskAnalysisUnits = this.tableData;
    }
  }
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

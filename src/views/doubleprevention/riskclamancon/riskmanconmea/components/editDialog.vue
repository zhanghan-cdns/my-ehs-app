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
      :openFlag="openEdit"
      :title="(isDisabled ? '查看' : form.id ? '编辑' : '新增') + title"
      height="85%"
      v-bind="$attrs"
      width="1050px"
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
            <el-col span="24">
              <el-form-item label="风险分析对象" prop="riskAnalysisObjectId">
                <el-select
                  v-model="form.riskAnalysisObjectId"
                  :isDisabled="isDisabled"
                  :size="size"
                  clearable
                  placeholder="请选择风险分析对象"
                  style="width: 99%"
                  @change="riskObjectAnalysisChange"
                >
                  <el-option
                    v-for="item in riskObjectAnalysisList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="风险分析单元" prop="riskAnalysisUnitId">
                <el-select
                  v-model="form.riskAnalysisUnitId"
                  :isDisabled="isDisabled"
                  :size="size"
                  clearable
                  placeholder="请选择风险分析单元"
                  style="width: 99%"
                  @change="riskUnitAnalysisChange"
                >
                  <el-option
                    v-for="item in riskUnitAnalysisList"
                    :key="item.id"
                    :label="item.unitName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="风险事件" prop="riskAnalysisEventId">
                <el-select
                  v-model="form.riskAnalysisEventId"
                  :isDisabled="isDisabled"
                  :size="size"
                  clearable
                  placeholder="请选择风险事件"
                  style="width: 99%"
                >
                  <el-option
                    v-for="item in riskEventAnalysisList"
                    :key="item.id"
                    :label="item.riskEventName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="管控方式" prop="riskManConType">
                <el-select
                  v-model="form.riskManConType"
                  :isDisabled="isDisabled"
                  :size="size"
                  clearable
                  placeholder="请选择管控方式"
                  style="width: 99%"
                >
                  <el-option
                    v-for="item in dictConfig.doublePreventionRiskManConType"
                    :key="item.id"
                    :label="item.dictValueName"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="!form.id">
            <div
              style="
              border-bottom: 1px solid #4a80fc;
              height: 30px;
              margin: 0px 15px 15px 25px;
            "
            >
            <span
              style="
                width: 2px;
                height: 5px;
                background: #4a80fc;
                border-left: 2px solid #4a80fc;
                margin-right: 7px;
              "
            ></span
            >添加管控措施
            </div>
            <el-row>
              <el-col span="12">
                <el-form-item label="管控措施分类1" prop="riskManConMeaCla1">
                  <el-select
                    v-model="form.riskManConMeaCla1"
                    :isDisabled="isDisabled"
                    :size="size"
                    :style="`width:${width}`"
                    clearable
                    placeholder="请选择管控措施分类1"
                    @change="handleChangeRiskManageMeasure"
                  >
                    <el-option
                      v-for="item in dictConfig.doublePreventionRiskManConMeaCla1"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="管控措施分类2" prop="riskManConMeaCla2">
                  <el-select
                    v-model="form.riskManConMeaCla2"
                    :isDisabled="isDisabled"
                    :size="size"
                    :style="`width:${width}`"
                    clearable
                    placeholder="请选择管控措施分类2"
                  >
                    <el-option
                      v-for="item in doublePreventionRiskManConMeaCla2"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="管控措施分类3" prop="riskManConMeaCla3">
                  <el-input
                    v-model="form.riskManConMeaCla3"
                    :isDisabled="isDisabled"
                    :size="size"
                    :style="`width:${width}`"
                    clearable
                    placeholder="管控措施分类3"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="管控措施描述" prop="description">
                  <el-input
                    v-model="form.description"
                    :autosize="{ minRows: 2, maxRows: 16 }"
                    :isDisabled="isDisabled"
                    :size="size"
                    clearable
                    placeholder="管控措施描述"
                    resize="none"
                    style="width: 99%"
                    type="textarea"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="隐患排查内容" prop="hazInvContent">
                  <el-input
                    v-model="form.hazInvContent"
                    :autosize="{ minRows: 2, maxRows: 16 }"
                    :isDisabled="isDisabled"
                    :size="size"
                    clearable
                    placeholder="隐患排查内容"
                    resize="none"
                    style="width: 99%"
                    type="textarea"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div
            v-if="!form.id"
            style="display: flex; justify-content: center; margin-bottom: 10px"
          >
            <el-button :size="size" type="primary" @click="submitForm">添加</el-button>
            <el-button :size="size" type="danger" @click="reset">清除</el-button>
          </div>
          <dom-size-listen v-model="sizeCon" style="flex: 1">
            <render-table
              :columns="columns"
              :data="tableData"
              :height="sizeCon.height"
            />
          </dom-size-listen>
          <basicPager :page="page" @pageChange="pageChange"></basicPager>
        </el-form>
      </template>
      <template #bottom>
        <div>
<!--          <el-button type="primary" @click="submitForm"-->
<!--          >保存-->
<!--          </el-button>-->
<!--          <el-button type="success" @click="reset">重置</el-button>-->
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
    <shift-dialog
      ref="shiftDialogRef"
      :dictConfig="{...dictConfig}"
    ></shift-dialog>
    <measures-dialog
      ref="measuresDialogRef"
      :dictConfig="{...dictConfig}"
      @refresh="getTableData({})"
    ></measures-dialog>
    <measures1-dialog
      ref="measures1DialogRef"
      :dictConfig="{...dictConfig}"
      @refresh="getTableData({})"
    ></measures1-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import shiftDialog from "./shiftDialog.vue";
import measuresDialog from "./measuresDialog.vue";
import measures1Dialog from "./measures1Dialog.vue";
import {objectInfoAllListAPI} from "@/api/doubleprevention/riskobject";
import {riskEventListAPI} from "@/api/doubleprevention/riskevent";
import {fastGetDictAPI} from "@/api/system/dictionary";
import {
  conmeacheckcycleGetFulleventIdAPI,
  riskmanconmeaCreateAPI, riskmanconmeaPageAPI,
  riskmanconmeaViewAPI
} from "@/api/doubleprevention/riskmanconmea";

export default {
  name: "editDialog",
  components: {
    shiftDialog,
    measuresDialog,
    measures1Dialog,
  },
  mixins: [tableMixins],
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      width: "350px",
      size: "small",
      form: {},
      sizeCon: {
        height: "420px",
      },
      rules: {
        riskAnalysisObjectId: [
          {required: true, message: "请选择风险分析对象", trigger: "change"},
        ],
        riskAnalysisUnitId: [
          {required: true, message: "请选择风险分析单元", trigger: "change"},
        ],
        riskAnalysisEventId: [
          {required: true, message: "请选择风险分析时间", trigger: "change"},
        ],
      },
      rowData: {},
      tableData: [],
      checkedDetail: [],
      columns: [
        {
          type: "checkbox",
          width: 50,
          align: "center",
          fixed: "left",
        },
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "risk_man_con_mea_cla1",
          title: "管控措施分类1",
          align: "center",
        },
        {
          field: "risk_man_con_mea_cla2",
          title: "管控措施分类2",
          align: "center",
        },
        {
          field: "risk_man_con_mea_cla3",
          title: "管控措施分类3",
          align: "center",
        },
        {
          field: "inspection_cycle",
          title: "巡检周期",
          align: "center",
        },
        {
          field: "inspection_cycle_unit",
          title: "巡检周期单位",
          align: "center",
        },
        // {
        //   field: "checkRate",
        //   title: "责任岗位",
        //   align: "center",
        // },
        {
          title: "措施操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, {row}) => {
            return (
              //  operateButtonList={this.operateButtonList}
              <operate-button
                operateButtonList={this.operateButtonList}
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              >
              </operate-button>
            );
          },
        },
        {
          title: "管控措施操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, {row}) => {
            return (
              <operate-button
                operateButtonList={this.operateButtonList1}
                on-operateButtonClick={(type) => {
                  this.operateButtonClick1(type, row);
                }}
              >
              </operate-button>
            );
          },
        },
      ],
      operateButtonList: ["tianjiabanci", "bianji"],
      operateButtonList1: ["bianji", "shanchu"],
      riskObjectAnalysisList: [],
      riskUnitAnalysisList: [],
      riskEventAnalysisList: [],
      // 管控措施2
      doublePreventionRiskManConMeaCla2: [],

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
      default: "管控措施",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  created() {
  },
  methods: {
    async getTableData({query, domain}) {
      let params = {
        "pageNum": this.page.currentPage !== 0 ? this.page.currentPage : 1,
        "pageSize": this.page.pageSize,
        ...domain,
      };
      query ? (params = {...params, ...query}) : params;
      const res = await conmeacheckcycleGetFulleventIdAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        console.log(this.tableData, 'this.tableData')
        this.page.totalResult = res.data.totalElements;
        this.page.currentPage = res.data.totalPages;
      }
    },
    // 获取风险管控措施子字典
    async handleChangeRiskManageMeasure(val) {
      const res = await fastGetDictAPI(val)
      if (res.code === 200) {
        this.doublePreventionRiskManConMeaCla2 = res.data.children
      }
    },

    // 打开
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
      this.isDisabled = type === "chakan";
      this.getRiskAnalysisObject()
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id);
        this.getTableData({query: {eventId: this.rowData.riskAnalysisEventId}})
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
            const res = await riskmanconmeaCreateAPI({...this.form})
        if (res.code === 200) {
          this.$message.success("创建成功")
          this.getTableData({query: {eventId: this.form.riskAnalysisEventId}})
          this.$emit("refresh")
        }
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
        const res = await riskmanconmeaViewAPI({id})
        if (res && res.code === 200) {
          this.form = {...res.data, riskManConType: res.data.riskManConType ? res.data.riskManConType.key : ''}
          // 获取到对象和单元id后立即获取相关下拉数据
          this.form.riskAnalysisObjectId = res.data.riskAnalysisEvent.riskAnalysisUnit.riskAnalysisObjectId
          this.form.riskAnalysisUnitId = res.data.riskAnalysisEvent.riskAnalysisUnitId
          this.riskObjectAnalysisChange(this.form.riskAnalysisObjectId)
          this.riskUnitAnalysisChange(this.form.riskAnalysisUnitId)
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    async addBtn() {

    },
    clearBtn() {
      this.reset()
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "tianjiabanci":
          this.$refs.shiftDialogRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.measuresDialogRef.open(row);
          break;
      }
    },
    operateButtonClick1(type, row) {
      switch (type) {
        case "bianji":
          this.$refs.measures1DialogRef.open(row);
          break;
        case "shanchu":
          // this.deleteData(row);
          break;
      }
    },
    // 获取风险对象
    async getRiskAnalysisObject() {
      const res = await objectInfoAllListAPI()
      if (res.code === 200) {
        this.riskObjectAnalysisList = res.data
      }
    },
    //  获取风险事件
    async getRiskAnalysisEvent(id) {
      const res = await riskEventListAPI({id: id})
      if (res.code === 200) {
        this.riskEventAnalysisList = res.data
      }
    },
    // 风险分析对象选择事件
    riskObjectAnalysisChange(val) {
      let result = this.riskObjectAnalysisList.filter(item => item.id === val)
      this.riskUnitAnalysisList = result[0].riskAnalysisUnits
    },
    // 风险分析单元选择事件
    riskUnitAnalysisChange(val) {
      this.getRiskAnalysisEvent(val)
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

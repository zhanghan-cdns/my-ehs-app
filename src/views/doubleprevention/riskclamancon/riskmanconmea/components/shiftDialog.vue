<template>
  <div id="">
    <basic-dialog
      :icon="icon"
      :openFlag="openEdit"
      height="70%"
      title="添加排查周期"
      v-bind="$attrs"
      width="850px"
      @close="close"
    >
      <template #content>
        <div class="container">
          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            :size="size"
            class="demo-ruleForm"
            label-width="120px"
          >
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
              >添加排查周期
            </div>
            <el-row>
              <el-col span="24">
                <el-form-item label="责任人" prop="entPersonnels">
                  <el-select
                    v-model="form.entPersonnels"
                    :isDisabled="isDisabled"
                    clearable
                    filterable
                    multiple
                    placeholder="请选择责任人"

                    style="width: 98%"
                  >
                    <el-option
                      v-for="item in entPersonList"
                      :key="item.id"
                      :label="item.userName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!--              <el-col span="4">-->
              <!--                <el-button :size="size" type="primary" @click="chooseBtn"-->
              <!--                >选择人员-->
              <!--                </el-button-->
              <!--                >-->
              <!--              </el-col>-->
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="巡检周期" prop="inspectionCycle">
                  <el-input-number
                    v-model="form.inspectionCycle"
                    :isDisabled="isDisabled"
                    clearable
                    placeholder="请输入巡检周期"
                    style="width: 99%"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="巡检周期单位" prop="inspectionCycleUnit">
                  <el-select
                    v-model="form.inspectionCycleUnit"
                    :isDisabled="isDisabled"
                    :size="size"
                    clearable
                    placeholder="请选择巡检周期单位"
                    style="width: 95%"

                  >
                    <el-option
                      v-for="item in dictConfig.doublePreventionRiskInspectionCycleUnit"
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
                <el-form-item label="任务开始时间" prop="taskStartTime">
                  <el-date-picker
                    v-model="form.taskStartTime"
                    :isDisabled="isDisabled"
                    placeholder="选择任务开始时间"
                    style="width: 99%"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <div
              style="
                display: flex;
                justify-content: center;
                margin-bottom: 10px;
              "
            >
              <el-button :size="size" type="primary" @click="submitForm">添加</el-button>
              <el-button :size="size" type="danger">清除</el-button>
            </div>
            <dom-size-listen v-model="sizeCon" style="flex: 1">
              <render-table
                :columns="columns"
                :data="tableData"
                :height="sizeCon.height"
              />
            </dom-size-listen>
          </el-form>
        </div>
      </template>
    </basic-dialog>
    <choose-dialog
      ref="chooseDialogRef"
      :dictConfig="{}"
    ></choose-dialog>
  </div>
</template>
<script>
import chooseDialog from "../../../../components/chooseDialog.vue";
import {conmeacheckcycleCreateAPI, conmeacheckcycleListAPI} from "@/api/doubleprevention/conmeacheckcycle";
import {entPersonnelListAllAPI} from "@/api/enterprise/entPersonnel";

export default {
  components: {
    chooseDialog,
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
  data() {
    return {
      isDisabled: "",
      rowData: "",
      form: {
        entPersonnels:[]
      },
      size: 'small',
      sizeCon: {
        height: "320px",
      },
      openEdit: false,
      rules: {
        entPersonnels: [
          {required: true, message: "请输入人员名称", trigger: "change"},
        ],
      },
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
          field: "inspectionCycle",
          title: "巡检周期",
          align: "center",
        },
        {
          field: "inspectionCycleUnit.value",
          title: "巡检周期单位",
          align: "center",
        },
        {
          field: "inspectorNames",
          title: "责任人",
          align: "center",
        },
        {
          field: "taskStartTime",
          title: "任务开始时间",
          align: "center",
        },
        // {
        //   title: "管控措施操作",
        //   align: "center",
        //   width: 160,
        //   fixed: "right",
        //   render: (h, {row, column, $index}) => {
        //     return (
        //       <operate-button
        //         operateButtonList={this.operateButtonList}
        //         on-operateButtonClick={(type) => {
        //           this.operateButtonClick(type, row);
        //         }}
        //       >
        //       </operate-button>
        //     );
        //   },
        // },
      ],
      operateButtonList: ["shanchu"],
      entPersonList: []
    };
  },

  created() {
    this.getPersonData()
  },
  methods: {
    async getPersonData() {
      const res = await entPersonnelListAllAPI();
      if (res.code === 200) {
        this.entPersonList = res.data
      }
    },
    open(row, type) {
      this.openEdit = true;
      if (row && row.mea_id) {
        this.rowData = row
          this.getTableData({query:{riskControlMeasureId: row.mea_id}})
      }
    },
    // 关闭
    close() {
      //   this.form.id = "";
      this.rowData = "";
      this.openEdit = false;
      this.$refs.formRef.resetFields();
    },

    chooseBtn() {
      //选择人员
      this.$refs.chooseDialogRef.open();
    },
    // 获取表格数据
    async getTableData({query, domain}) {
      const res = await conmeacheckcycleListAPI(query);
      if (res.code === 200) {
        this.tableData = res.data;
        console.log(this.tableData, 'this.tableData')
      }
    },
    operateButtonClick() {

    },
    submitForm() {
      this.$refs.formRef.validate(async  (valid) => {
        if (valid) {
          this.form.entPersonnels=this.form.entPersonnels.map(item=>({id:item}))
          const  res= await conmeacheckcycleCreateAPI({...this.form,riskControlMeasureId:this.rowData.mea_id})
          if(res.code===200){
            this.getTableData({id: this.rowData.mea_id})
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .vxe-modal--content {
  background: #eeeeee;
  padding: 10px;
  padding-bottom: 5px;
}

.container {
  border-radius: 3px;
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px 15px;
  padding-top: 20px;
}

/deep/ .el-form-item__error {
  line-height: 5px !important;
}
</style>

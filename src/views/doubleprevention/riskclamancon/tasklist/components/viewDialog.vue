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
      width="1050px"
      height="85%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
            @cell-click="cellClick"
            @checkbox-all="selectChangeEvent"
            @checkbox-change="selectChangeEvent"
          />
        </dom-size-listen>
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
  sdpInfoUpdateAPI
} from "@/api/duty/duty_standard_allocation";

export default {
  name: "editDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      width: "350px",
      size: "small",
      form: {
        restrictSpaceName: "",
        id: ""
      },
      sizeCon: {
        height: "320px"
      },
      rules: {
        checkMeasure: [
          { required: true, message: "请输入考核办法", trigger: "blur" }
        ],
        checkValue: [
          { required: true, message: "请输入考核值", trigger: "blur" }
        ],
        department: [
          { required: true, message: "请输入责任部门", trigger: "blur" }
        ],
        designer: [
          { required: true, message: "请输入制定人", trigger: "blur" }
        ],
        makeDate: [
          { required: true, message: "请输入制定日期", trigger: "blur" }
        ],
        dutyDoc: [
          { required: true, message: "请输入安全目标责任书", trigger: "blur" }
        ],
        rate: [{ required: true, message: "请输入频次", trigger: "blur" }],
        targetCode: [
          { required: true, message: "请输入目标指标编号", trigger: "blur" }
        ],
        targetValue: [
          { required: true, message: "请输入目标值", trigger: "blur" }
        ],
        year: [{ required: true, message: "请输入年度", trigger: "blur" }]
      },
      rowData: {},
      tableData: [{ riskEventName: "1" }],
      checkedDetail: [],
      columns: [
        {
          type: "checkbox",
          width: 50,
          align: "center",
          fixed: "left"
        },
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center"
        },
        {
          field: "riskEventName",
          title: "排查结果",
          align: "center"
        },
        {
          field: "assessmentMethod",
          title: "排查结果备注",
          align: "center"
        },
        {
          field: "year",
          title: "排查人",
          align: "center"
        },
        {
          field: "targetName",
          title: "排查时间",
          align: "center"
        }
      ],
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
        const res = await sdpInfoCreateAPI(this.form);
        if (res.code === 200) {
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
        const res = await sdpInfoViewAPI({ id });
        if (res.code === 200) {
          this.form = {
            ...res.data,
            accidentType: res.data.accidentType ? res.data.accidentType.key : ""
          };
          // 为图片添加名字
          this.form.file = res.data.file.map(item => {
            return {
              ...item,
              name: item.originalFilename
            };
          });
          console.log(this.form);
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    addBtn() {
      //添加行
      let obj = {
        riskEventName: "",
        assessmentMethod: "",
        riskEventName: "",
        assessmentMethod: "",
        year: "",
        targetName: "",
        targetType: "",
        checkRate: ""
      };
      this.tableData.push(obj);
    },
    clearBtn() {
      //清除
      // if (this.checkedDetail.length == 0) {
      //   this.$message("请先选择要删除的数据");
      // } else {
      //   let val = this.checkedDetail;
      //   val.forEach((val, index) => {
      //     this.tableData.forEach((v, i) => {
      //       if (val.riskEventName === v.riskEventName) {
      //         this.tableData.splice(i, 1);
      //       }
      //     });
      //   });
      // }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "tianjiabanci":
          this.$refs.shiftDialogRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.measuresDialogRef.open(row);
          break;
        case "shanchu":
          // this.deleteData(row);
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

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
      width="850px"
      height="55%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="tab_wrap">
          <div :class="tabId == 1 ? 'tab tab_now' : 'tab'" @click="choseTab(1)">
            已回执人员（79）
          </div>
          <div :class="tabId == 2 ? 'tab tab_now' : 'tab'" @click="choseTab(2)">
            未回执人员（32）
          </div>
        </div>
        <el-form
          label-width="140px"
          label-position="right"
          :model="form"
          :rules="rules"
          ref="formRef"
        >
          <el-row>
            <el-col :span="24">
              <dom-size-listen style="flex: 1" v-model="sizeCon">
                <render-table
                  :data="tableData"
                  :columns="columns"
                  height="100px"
                />
              </dom-size-listen>
            </el-col>
          </el-row>
          <basicPager :page="page" @pageChange="pageChange"></basicPager>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <!-- <el-button type="primary" @click="submitForm('form')"
            >保存
          </el-button> -->
          <!-- <el-button type="success" @click="reset('form')">重置 </el-button> -->
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import {
  finiteSpaceCreateAPI,
  finiteSpaceViewAPI,
  finiteSpaceUpdateAPI,
} from "@/api/enterprise/finite-space";

export default {
  name: "editDialog",
  data() {
    return {
      tabId: 1,
      openEdit: false,
      isDisabled: "",
      width: "260px",
      size: "small",
      form: {
        restrictSpaceName: "",
        id: "",
      },
      rules: {
        // 有限空间名称
        restrictSpaceName: [
          { required: true, message: "请输入有限空间", trigger: "blur" },
        ],
        // 易导致事故类型
        accidentType: [
          {
            required: true,
            message: "请选择易导致事故类型",
            trigger: "change",
          },
        ],
      },
      tableData: [{ restrictSpaceName: "1" }],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "restrictSpaceName",
          title: "岗位名称",
          align: "center",
        },
        {
          field: "affiliatedFunctionId",
          title: "姓名",
          align: "center",
        },
        {
          field: "locate",
          title: "回执书",
          align: "center",
          render: (h, { row, column, $index }) => {
            return (
              <div onclick={(e) => this.myFunction(e, row)} class="attachment">
                常州飞腾化....
              </div>
            );
          },
        },
      ],
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
      default: "查看回执状态",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    edit(row, index) {
      row.iseditor = true;
    },
    save(row, index) {
      row.iseditor = false;
    },
    // 打开
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
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
        const res = await finiteSpaceCreateAPI(this.form);
        if (res.code === 200) {
          this.close();
          this.$emit("refresh");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    myFunction() {
      //上传附件

      console.log(324124);
    },
    // 修改
    async modify() {
      try {
        const res = await finiteSpaceUpdateAPI({
          ...this.form,
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
        const res = await finiteSpaceViewAPI({ id });
        if (res.code === 200) {
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    //tab选项切换
    choseTab(id) {
      this.tabId = id;
     
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

/deep/ .attachment {
  cursor: pointer;
  color: #ff4646;
  border: 1px dashed #ff4646;
  border-radius: 4px;
  padding: 4px;
}
/deep/ .tab_wrap {
  margin-top: 20px;
  display: flex;
  height: 40px;
  border-bottom: 1px solid #1890ff;
  margin-bottom: 8px;
}
.tab {
  cursor: pointer;
  width: 126px;
  height: 38px;

  text-align: center;
  color: #4a80fc !important;
  line-height: 14px;
}
.tab_now {
  width: 126px;
  height: 38px;

  font-size: 14px;
  color: #4a80fc !important;
  background: #f0f5ff;
  text-align: center;
  line-height: 14px;
}
</style>

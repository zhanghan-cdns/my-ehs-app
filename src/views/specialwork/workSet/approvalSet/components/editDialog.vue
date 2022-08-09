<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="880"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="wrap">
          <el-form ref="form" :model="form" label-width="108px" :inline="true">
            <el-row v-for="(item, index) in form" :key="index">
              <el-col :span="11">
                <el-form-item label="审批环节">
                  <el-input
                    v-model="form[index].sphj"
                    :style="width"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="审批人">
                  <el-input
                    v-model="form[index].spr"
                    :style="width"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" v-show="index == 0">
                <el-button type="primary" size="small" @click="addItem">
                  <i class="iconfont icon-jia"></i>
                </el-button>
              </el-col>
              <el-col :span="2" v-show="index != 0">
                <el-button type="danger" size="small" @click="delItem(index)">
                  <i class="iconfont icon-shanchutianchong"></i>
                </el-button>
              </el-col>
            </el-row>
          </el-form>
          <el-row type="flex" justify="center">
            <el-col :span="2">
              <el-button type="primary" size="small" @click="addToTable">
                添加
              </el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                type="primary"
                size="small"
                class="red"
                @click="clearItem"
              >
                删除
              </el-button>
            </el-col>
          </el-row>
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
            @checkbox-change="checkboxChange"
          />
          <basicPager :page="page" @pageChange="pageChange"></basicPager>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm()" v-show="!isDisabled"
            >保存
          </el-button>
          <el-button type="success" @click="reset()" v-show="!isDisabled"
            >重置
          </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      sizeCon: {
        height: 400,
      },
      openEdit: false,
      icon: "icon-bianji1",
      title: "动火作业审批设置",
      workName: "",
      width: "width:260px",
      form: [
        {
          sphj: "",
          spr: "",
        },
      ],
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
          field: "sphj",
          title: "审批环节",
          align: "center",
        },
        {
          field: "spr",
          title: "审批人",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          render: (h, scope) => {
            return (
              <operate-button
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, scope);
                }}
              ></operate-button>
            );
          },
        },
      ],
    };
  },
  mounted() {},
  methods: {
    open(workName) {
      this.openEdit = true;
      this.workName = workName;
    },
    close() {
      this.openEdit = false;
    },
    //添加表单条目
    addItem() {
      let obj = {
        sphj: "",
        spr: "",
      };
      this.form.push(obj);
    },
    //删除表单条目
    delItem(index) {
      this.form.splice(index, 1);
      console.log(this.form);
    },
    // 删除所有条目
    clearItem() {
      this.form = [
        {
          sphj: "",
          spr: "",
        },
      ];
    },
    //添加入表格
    addToTable() {
      this.tableData = this.tableData.concat(this.form);
      this.tableData.map((item) => {});
      console.log(this.tableData);
    },
    pageChange() {},
    operateButtonClick(type, scope) {
      let index = scope.$rowIndex;
      if (type == "shangyi" && index == 0) {
        return;
      } else if (type == "xiayi" && index == this.tableData.length - 1) {
        return;
      } else {
        this.swapArr(this.tableData, index, type);
      }
    },
    swapArr(arr, index1, type) {
      if (type == "shangyi") {
        let temp = arr[index1];
        let temp2 = arr[index1 - 1];
        arr[index1 - 1] = temp;
        arr[index1] = temp2;
      } else if (type == "xiayi") {
        let temp = arr[index1];
        let temp2 = arr[index1 + 1];
        arr[index1 + 1] = temp;
        arr[index1] = temp2;
      }
      this.$set(this, "tableData", [...arr]);
    },
    reset() {
      this.form = [
        {
          sphj: "",
          spr: "",
        },
      ];
      this.tableData = [];
    },
    close() {
      this.openEdit = false;
      this.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.wrap {
  padding: 20px 0px;
}
.red {
  background: #ff4646;
  border: 1px solid #ff4646;
}
</style>

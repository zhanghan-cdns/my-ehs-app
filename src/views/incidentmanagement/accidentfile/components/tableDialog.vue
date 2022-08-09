<template>
  <div>
    <basic-dialog
      icon=""
      title="新增人员"
      width="850px"
      height="75%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="role_operation_box">
          <div>
            <el-input
              placeholder="请输入姓名"
              clearable
              v-model="query.job"
              style="width: 200px; margin-right: 5px"
            ></el-input>
            <el-input
              placeholder="请输入岗位"
              clearable
              v-model="query.job"
              style="width: 200px; margin-right: 5px"
            ></el-input>
          </div>
          <header-button @headerButtonClick="headerButtonMethods" />
          <!-- <el-button @click="headerButtonMethods('xinzeng')" type="primary" size="small" icon="el-icon-plus">添加
          </el-button>
           <el-button @click="headerButtonMethods('chaxun')" type="primary" size="small" icon="el-icon-plus">查询
          </el-button> -->
        </div>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
            @checkbox-all="selectChangeEvent"
            @checkbox-change="selectChangeEvent"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
      <template #bottom>
        <div>
          <el-button type="warning" @click="close">关闭</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import dictMixin from "@/mixins/dict";
export default {
  mixins: [dictMixin],
  name: "editDialog",
  data() {
    return {
      sizeCon: {
        height: "300px",
      },
      tableData: [
        { name: "1", safetyDuty: "2", editor: "3", attachment: "4", phone: "5" ,id:'1'},
        { name: "2", safetyDuty: "2", editor: "7", attachment: "4", phone: "5" ,id:'2'},
      ],
      
      query: {
        job: "",
      },
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
          field: "name",
          title: "姓名",
          align: "center",
        },
        {
          field: "safetyDuty",
          title: "性别",
          align: "center",
        },
        {
          field: "editor",
          title: "岗位",
          align: "center",
        },
        {
          field: "attachment",
          title: "学历",
          align: "center",
        },
        {
          field: "phone",
          title: "联系方式",
          align: "center",
        },
      ],
      openEdit: false,
      chooseData:[],
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
    },
    // 关闭
    close() {
      this.openEdit = false;
    },
     // 复选框选中
    selectChangeEvent(val) {
      this.chooseData = val.records;
    },
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$emit("refresh",this.chooseData); 
        this.close();
      } else if (type === "chaxun") {
      } else if (type === "chongzhi") {
        this.query = {
          job: "",
        };
      }
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
/deep/.safeBook {
  margin: 0px 15px 0px 40px;
}

.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>

<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <div>
            <el-input placeholder="请输入人员姓名" clearable style="width:220px;margin-right: 10px"></el-input>
            <el-select placeholder="请选择人员基本类型" v-model="selsectData">
              <el-option v-for="item in optionsPersonnel" :key="item.dictKeyId" :label="item.dictValueName" :value="item.dictValue"></el-option>
            </el-select>
          </div>
          <header-button @headerButtonClick="headerButtonMethods"/>
        </header-container>
        <dom-size-listen style="flex:1" v-model="sizeCon">
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>



    <edit-dialog
      ref="editDialogRef" @refresh="getTableData({})"
    ></edit-dialog>
    <dialog-view ref="viewDialogRef"></dialog-view>
  </div>
</template>

<script>
import {
  entPersonnelListAPI,
  entPersonnelRemoveAPI,
} from "@/api/enterprise/entPersonnel/index";
import editDialog from "./components/editDialog.vue";
import { fastGetDictAPI } from "@/api/system/dictionary";//字典
import DialogView from './components/dialogView.vue';
import tableMixins from '@/mixins/table';
import commonMixin from '@/mixins/common'
import dictMixin from '@/mixins/dict'
import HeaderContainer from "@views/enterprise/dust/components/HeaderContainer";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],

  components: { editDialog, DialogView,HeaderContainer },
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      tableData: [],
      selsectData:'',//选中人员类型
      optionsPersonnel:[],//人员类型
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "entPersonName",
          title: "姓名",
          align: "center",
        },
        {
          field: "entPersonGender.value",
          title: "性别",
          align: "center",
        },
        {
          field: "jobNumber",
          title: "工号",
          align: "center",
        },
        {
          field: "entPersonCertNumber",
          title: "证件号码",
          align: "center",
        },
        {
          field: "department",
          title: "部门",
          align: "center",
        },
        {
          field: "passportNumber",
          title: "岗位",
          align: "center",
        },
        {
          field: "entPersonType.value",
          title: "人员类型",
          align: "center",
        },
        {
          field: "remark",
          title: "联系电话",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row, column, $index }) => {
            return (
              <operate-button
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          },
        },
      ],
    };
  },
  created() {
    this.getTableData();
    this.initLoadDict();
  },
  // mounted(){
  //     this.getTableData()
  // },
  watch: {
    tableData: {
      handler(newVal, oldVal) {
        console.log("newVal", newVal);
        // this.tableData = newVal
        // this.selectById()//加载回显三级级联
      },
      deep: true, // 必须设置
    },
  },
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      }else if(type==="chaxun"){
        this.getTableData({query:this.query});
      }else if(type ==="chongzhi"){
        this.query={
          restrictSpaceName:""
        }
        this.getTableData({});
      }
    },
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "dictionary":
          this.$refs.dictValueDialogRef.open(row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteTable(row.id);
          break;
        case "chakan":
          this.$refs.viewDialogRef.open(row);
          break;

      }
    },
    // 删除列表数据
    deleteTable(id) {
      this.$confirm("你确定要删除此条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        entPersonnelRemoveAPI({ ids: id }).then((res) => {
          console.log('删除成功1',res)
          this.$message.success("删除成功");
          this.getTableData();
        });
      });
    },
    // 获取列表数据
    async getTableData(domain) {
      let params = {
        ...domain,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      console.log('this.query',this.selsectData)
      console.log('params选择',params)
      const res = await entPersonnelListAPI(params);
      console.log("res.data", res.data);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    },
     //初始化加载字典
    initLoadDict() {
      fastGetDictAPI("ENT_PERSON_TYPE").then((res) => {//人员类别
         this.optionsPersonnel = res.data
      });

    },


  },
};
</script>

<style lang="scss" scoped>

// .content {
//   width: 100%;
//   height: 100%;
//   background: white;
//   .topLeft {
//     position: relative;
//     .contentLeft {
//       display: flex;
//       margin: 16px;
//     }
//     .rightButton {
//       position: absolute;
//       top: -6px;
//       right: 20px;
//     }
//   }
// }
// .option {
//   margin-left: 25px;
// }
// .tableD {
//   padding: 10px;
// }
</style>

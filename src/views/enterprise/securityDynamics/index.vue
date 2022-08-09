<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <el-input
              placeholder="请输入安全动态主题名称"
              clearable
              v-model="query.safeDynamicTopic"
              style="width: 200px; margin-right: 5px"
            ></el-input>
          </div>
          <header-button @headerButtonClick="headerButtonMethods" />
        </div>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
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
      ref="editDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></edit-dialog>
    <view-topic ref="viewTopicRef"></view-topic>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import editDialog from "./editDialog.vue";
import viewTopic from './viewTopic.vue';
// import { adpInfoListAPI } from "@/api/duty/safe/index.js";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
    viewTopic
  },
  name: "securityDynamics",
  data() {
    return {
      query: {
        safeDynamicTopic:""
      },
      tableData: [        
        { 
          id:1,
          safetyTarget: "1",
          safeDynamicTopic:'省应急管理厅关于做好台风期间安全防范工作的紧急通知123',
          content:'123',
          editorContent:`<p class="MsoNormal" style="text-indent: 30.0pt;"><span style="font-family: 仿宋; mso-ascii-font-family: 'Times New Roman'; mso-hansi-font-family: 'Times New Roman';">本规范规定了常州市化工企业建设的双重预防机制数字化创建平台中双重预防机制数字化创建业务系统的数据的分类、接入要求、交换方式等，用于统一常州市化工企业双重预防机制数字化创建平台的数据格式及接入规范。</span></p>
                    <p class="MsoNormal" style="text-indent: 30.0pt;"><span style="font-family: 仿宋; mso-ascii-font-family: 'Times New Roman'; mso-hansi-font-family: 'Times New Roman';">本规范适用于常州市危险化学品生产企业、危险化学品仓储经营企业和危险化学品经营带储存设施企业。</span></p>`,
          category:'措施',
          status:1,

        }],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "safeDynamicTopic",
          title: "安全动态主题",
          align: "center",
          render:(h,{row,column,$$index})=>{
            return (
              <div style="color:#649DFF;cursor:pointer;" onClick={()=>this.getWordDoc(row)}>{row.safeDynamicTopic}</div>
            )
          }
        },
        {
          field: "dynamicClassification",
          title: "动态分类",
          align: "center",
        },
        {
          field: "theBody",
          title: "正文",
          align: "center",
        },

        {
          field: "attachment",
          title: "附件",
          align: "center",
          width: 300,
          fixed: "right",
          render: (h, { row, column, $index }) => {
            return (
              <div style="cursor: pointer;color:#4a80fc;border:1px dashed #4a80fc;border-radius:4px;padding:4px;" onClick={(e)=>this.getWordDoc()}>常新防（2021）7号关注通知</div>
            );
          },
        },
      ],
    };
  },
  created() {},
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData({query:this.query});
      } else if (type === "chongzhi") {
        this.query = {
          // restrictSpaceName:""
        };
        this.getTableData({});
      }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          break;
        case "xiafa":
          break;
      }
    },
    //点击主题
    getWordDoc(row){
      console.log('getWordDoc');
      this.$refs.viewTopicRef.open(row);
    },
    async getTableData({ query, domain }) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      query ? (params = { ...params, ...query }) : params;
      // const res = await adpInfoListAPI(params);
      // if (res.code === 200) {
      //   this.tableData = res.data.content;
      //   this.page.totalResult = res.data.totalElements;
      //   this.page.currentPage = res.data.totalPages;
      // }
    },
  },
};
</script>

<style scoped lang="scss">
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>

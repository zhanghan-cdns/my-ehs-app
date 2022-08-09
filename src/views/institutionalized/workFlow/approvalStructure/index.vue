<template>
  <div class="grid-base">
    <list-container>
      <template #left> </template>
      <template #right>
        <header-container>
          <div>
            <el-input
              v-model="query.name"
              placeholder="请输入名称"
              style="width: 200px"
              clearable
            ></el-input>
          </div>
          <header-button @headerButtonClick="headerButtonMethods" />
        </header-container>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            @checkbox-change="selectChangeEvent"
            @checkbox-all="selectChangeEvent"
            border
            resizable
            :tree-config="{ children: 'children', expandAll: true }"
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
          />
        </dom-size-listen>
      </template>
    </list-container>
    <edit-dialog ref="editDialogRef" @refresh="getTableData"></edit-dialog>
    <add-approver-dialog
      ref="addApproverDialogRef"
      @refresh="getTableData"
    ></add-approver-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import editDialog from "./components/editDialog.vue";
import addApproverDialog from "./components/addApproverDialog.vue";
// import { superviseLevelListTreeAPI, superviseLevelDeleteAPI } from "@/api/NANO/gridmanage/superviselevel";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: { HeaderContainer, editDialog, addApproverDialog },
  data() {
    return {
      ids: [],
      query: {
        name: "",
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
          align: "center",
        },
        {
          field: "service_name",
          title: "业务",
          align: "center",
        },
        {
          field: "step_name",
          title: "名称",
          align: "left",
          treeNode: "true",
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
  },
  methods: {
    // 头部按钮
    headerButtonMethods(type) {
      switch (type) {
        case "xinzeng":
          this.$refs.editDialogRef.open();
          break;
        case "chaxun":
          this.getTableData(this.query);
          break;
        case "chongzhi":
          this.query = {
            name: "",
          };
          this.getTableData(this.query);
          break;
      }
    },
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.ids = [row.id];
          this.deleteTable();
          break;
        case "tianjiashenpiren":
          this.$refs.addApproverDialogRef.open(row);
          break;
      }
    },

    // 获取列表数据
    async getTableData(query, domain = {}) {
      this.tableData = [
        {
          id: 30072,
          fid: 0,
          step_name: "厂级",
          service_name: "风险研判",
          sort: 1,
          approval_person: '[{"id":"50636","name":"李剑","sort":1}]',
          children: [
            {
              id: 80075,
              fid: 30072,
              step_name: "101车间",
              service_name: "风险研判",
              children: [
                {
                  id: 80076,
                  fid: 80075,
                  step_name: "班组3",
                  service_name: "风险研判",
                  approval_person: '[{"id":"10299","name":"中安01","sort":1}]',
                },
              ],
            },
            {
              id: 60073,
              fid: 30072,
              step_name: "102车间",
              service_name: "风险研判",
              approval_person: '[{"id":"50639","name":"李忠强","sort":1}]',
              children: [
                {
                  id: 70075,
                  fid: 60073,
                  step_name: "班组2",
                  service_name: "风险研判",
                },
                {
                  id: 60074,
                  fid: 60073,
                  step_name: "班组1",
                  service_name: "风险研判",
                  approval_person:
                    '[{"id":"50638","name":"刘成勇","sort":1},{"id":"37633","name":"袁中军","sort":2}]',
                },
              ],
            },
          ],
        },
        {
          id: 20072,
          fid: 0,
          step_name: "1",
          service_name: "法律法规",
          approval_person: '[{"id":"15446","name":"中安联科12","sort":1}]',
        },
      ];
      //   let params = {
      //     ...domain,
      //   };
      //   query ? (params = { ...params, ...query }) : params;
      //   const res = await superviseLevelListTreeAPI(params);
      //   if (res.code === 200) {
      //     this.tableData = res.data;
      //   }
    },

    // 删除列表数据
    deleteTable() {
      //   this.$confirm("你确定要删除此条记录吗?", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning",
      //   }).then(() => {
      //     superviseLevelDeleteAPI({ ids: this.ids.join(',') }).then((res) => {
      //       this.ids = [];
      //       this.$message.success("删除成功");
      //       this.getTableData(this.query);
      //     });
      //   });
    },

    selectChangeEvent({ records }) {
      console.log(records, "records");
    },
  },
};
</script>

<style scoped lang="scss">
</style>

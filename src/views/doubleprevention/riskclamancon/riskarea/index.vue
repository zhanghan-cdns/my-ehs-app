<template>
  <div>
    <list-container>
      <template #left>1424</template>
      <template #right>
        <el-row>
          <el-col :span="12">
            <div class="role_operation_box">
              <div>
                <el-input
                  placeholder="请输入名称"
                  clearable
                  v-model="query.restrictSpaceName"
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
          </el-col>
          <el-col :span="12">
            <div class="imgPositioning">
              <map-picker
                ref="mapPicker"
                style="width: 100%; height: 100%;"
              ></map-picker>
            </div>
          </el-col>
        </el-row>
      </template>
    </list-container>
    <edit-dialog
      ref="editDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></edit-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import mapPicker from "@/components/mars3d-earth/editor/picker";
import editDialog from "../riskarea/components/editDialog.vue";
import {araeInfoListAPI,araeInfoDeleteAPI} from '@/api/doubleprevention/riskarea/index.js';
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    mapPicker,
    editDialog
  },
  name: "indexProvide",
  data() {
    return {
      sizeCon: {
        height: "660px"
      },
      query: {},
      tableData: [{ restrictSpaceName: "1",affiliatedFunctionId:"33" }],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center"
        },
        {
          field: "areaName",
          title: "风险分区名称",
          align: "center"
        },
        {
          field: "affiliatedFunctionId",
          title: "区域风险等级",
          align: "center"
        },
        {
          field: "mainSubstance",
          title: "评估时间",
          align: "center"
        },
        {
          field: "num",
          title: "复评时间",
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
                on-operateButtonClick={type => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          }
        }
      ]
    };
  },
  created() {},
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        // this.getTableData({query:this.query});
      } else if (type === "chongzhi") {
        this.query = {
          // restrictSpaceName:""
        };
        // this.getTableData({});
      }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.editDialogRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          // this.deleteData(row);
          break;
        case "pinggu":
          this.$router.push({
            // path: "/riskDetails",
            name:'风险详情',
            params: { row: row, type:type}
          });
          break;
      }
    },
    async deleteData(row) {
      this.$confirm("确定删除该条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await araeInfoDeleteAPI({
            ids: row.id
          });
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.getTableData({});
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    async getTableData({ query, domain }) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain
      };
      query ? (params = { ...params, ...query }) : params;
      const res = await araeInfoListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
        this.page.currentPage = res.data.totalPages;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.imgPositioning {
  width: 100%;
  height: 750px;
  padding: 20px;
}
</style>

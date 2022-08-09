<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <div>
            <el-input
              placeholder="请输入重大危险源名称"
              clearable
              v-model="query.hazardName"
              style="width: 200px; margin-right: 10px"
            ></el-input>
            <el-select
              placeholder="请选择重大危险源类别"
              clearable
              v-model="query.hazardType"
              :style="`width:${width}`"
            >
              <el-option
                v-for="item in entHazardBaseinfoType"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
          </div>
          <header-button @headerButtonClick="headerButtonMethods" />
        </header-container>
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
      :dictConfig="{
        entHazardBaseinfoType,
        entHazardBaseinfoLevel,
        entHazardBaseinfoMaindanger,
        entHazardBaseinfoAccidenttype,
        entHazardBaseinfoHiddendangertype,
        entHazardBaseinfoProductiontypes,
        entHazardBaseinfoHazardousprocess,
        entHazardBaseinfoEnvironmental,
        entHazardBaseinfoProductionproperty,
      }"
      @refresh="getTableData({})"
    ></edit-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import editDialog from "@/views/hazard/hazardBase/components/editDialog.vue";
import {
  hazardBaseListAPI,
  hazardBaseDeleteAPI,
} from "@/api/hazard/hazardBase/index";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    HeaderContainer,
    editDialog,
  },
  data() {
    return {
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "hazardName",
          title: "重大危险源名称",
          align: "center",
        },
        {
          field: "hazardCode",
          title: "重大危险源编码",
          align: "center",
        },
        {
          field: "hazardType",
          title: "重大危险源类别",
          align: "center",
          render: (h, { row }) => {
            return <div>{row.hazardType ? row.hazardType.value : ""}</div>;
          },
        },
        {
          field: "hazardLevel",
          title: "重大危险源等级",
          align: "center",
          // render: (h, { row }) => {
          //   if (row.hazardLevel) {
          //     if (row.hazardLevel.value === "一级") {
          //       return <div class="btn-level red">{row.hazardLevel.value}</div>;
          //     }
          //     if (row.hazardLevel.value === "二级") {
          //       return (
          //         <div class="btn-level orange">{row.hazardLevel.value}</div>
          //       );
          //     }
          //     if (row.hazardLevel.value === "三级") {
          //       return (
          //         <div class="btn-level yellow">{row.hazardLevel.value}</div>
          //       );
          //     }
          //     if (row.hazardLevel.value === "四级") {
          //       return (
          //         <div class="btn-level blue">{row.hazardLevel.value}</div>
          //       );
          //     }
          //   }
          // },
        },
        {
          field: "rvalue",
          title: "R值",
          align: "center",
        },
        {
          field: "mainDirectName",
          title: "主要负责人",
          align: "center",
          render: (h, { row }) => {
            return (
              <div>{row.mainDirectName ? row.mainDirectName.name : ""}</div>
            );
          },
        },
        {
          field: "mainDirectName",
          title: "负责人电话",
          align: "center",
          render: (h, { row }) => {
            return (
              <div>{row.mainDirectName ? row.mainDirectName.phone : ""}</div>
            );
          },
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
      query: {
        hazardName: "",
        hazardType: "",
      },
    };
  },
  created() {
    this.getTableData({});
  },
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData({ query: this.query });
      } else if (type === "chongzhi") {
        this.query = {
          hazardName: "",
          hazardType: "",
        };
        this.getTableData({});
      }
    },
    async getTableData({ query, domain }) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      query ? (params = { ...params, ...query }) : params;
      const res = await hazardBaseListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.total = res.data.total;
      }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.editDialogRef.open(row,type);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row,type);
          break;
        case "shanchu":
          this.deleteData(row);
          break;
      }
    },
    async deleteData(row) {
      this.$confirm("确定删除该条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await hazardBaseDeleteAPI({
            ids: row.id,
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
  },
};
</script>

<style lang="scss" scoped>
/deep/ .btn-level {
  width: 67px;
  height: 29px;
  line-height: 29px;
  border-radius: 2px 2px 2px 2px;
  margin: 0 auto;
  opacity: 1;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  letter-spacing: 5px;
}

/deep/ .blue {
  background: #5d9eff;
}

/deep/ .yellow {
  background: #f1ad0f;
}

/deep/ .orange {
  background: #f58311;
}

/deep/ .red {
  background: #f54011;
}
</style>

<template>
  <div class="operation">
    <list-container>
      <template #left></template>
      <template #right>
        <div v-if="isHide" style="margin: 0 auto">
          <div class="right_title" style="margin: 0 auto">
            <img
              alt=""
              src="@/assets/images/title.png"
              style="margin-top: 150px"
            />
          </div>
          <div class="app">
            <ul class="tab-tilte">
              <li
                v-for="(title, index) in tabTitle"
                :key="index"
                :class="{ active: index == cur }"
                @click="tab(index)"
              >
                {{ title }}
              </li>
            </ul>
            <div class="tab-content">
              <div>
                <el-input
                  v-model="query.name"
                  clearable
                  placeholder="请输入搜索关键字"
                  style="width: 80%"
                  @input="iptValue"
                ></el-input>
                <el-button @click="searchChange">搜索</el-button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="isShow">
          <div class="header">
            <div>
              <el-select
                v-model="query.firstType"
                clearable
                placeholder="大类别"
                style="width: 200px; margin-right: 5px"
                @change="selectChange"
              >
                <el-option
                  v-for="(item, index) in certificateTypeList"
                  :key="index"
                  :label="item.dictValueName"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
              <el-input
                v-model="query.name"
                clearable
                placeholder="请输入名称"
                style="width: 205px; margin-right: 5px"
              ></el-input>
              <el-input
                v-model="query.secondType"
                clearable
                placeholder="请输入小类别"
                style="width: 205px; margin-right: 5px"
              ></el-input>
            </div>
            <header-button @headerButtonClick="headerButtonMethods" />
          </div>
          <dom-size-listen v-model="sizeCon" style="flex: 1">
            <render-table
              :columns="columns"
              :data="tableData"
              :height="sizeCon.height"
              @checkbox-change="selectChangeEvent"
              @checkbox-all="selectChangeEvent"
            />
          </dom-size-listen>
          <basicPager :page="page" @pageChange="pageChange"></basicPager>
        </div>
      </template>
    </list-container>
    <edit-dialog ref="editDialogRef" @refreshDataList="update"></edit-dialog>
  </div>
</template>
<script>
import editDialog from "./editDialog.vue";
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import { imgUrl } from "@/router/axios";

export default {
  components: { editDialog },
  // 混入树形组件
  mixins: [tableMixins, commonMixin, dictMixin],
  data() {
    return {
      tableData: [],
      domainList: [],
      ids: [],
      query: {
        firstType: "",
        name: "",
        secondType: "",
      },
      sizeCon: {
        height: "580px",
      },
      fistName: "",
      certificateTypeList: [],
      tabTitle: ["法律", "法规", "规章"],
      tabContents: [],
      cur: "0", // 默认选中第一个tab
      imgUrl,
      isHide: true,
      isShow: false,
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
          field: "firstType",
          title: "大类别",
          align: "center",
        },
        {
          field: "secondType",
          title: "小类别",
          align: "center",
        },
        {
          field: "name",
          title: "名称",
          align: "center",
        },
        {
          field: "attachment",
          title: "附件下载",
          align: "center",
          render: (h, { row, column, $index }) => {
            return (
              <div
                onclick={(e) => this.myFunction(e, row)}
                style="padding:2px;border:1px dashed #4A80FC;color:#4A80FC"
              >
                {row.attachment.originalFilename}
              </div>
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
      page: {
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.cur = 0;
  },
  methods: {
    selectChange(val) {},
    async searchChange() {
      // 查询事件

      // let params = {
      //   firstType: this.query.firstType,
      //   secondType: this.query.secondType,
      //   name: this.query.typeSearch,
      //   docType: this.cur,
      //   "queryParams[pageNum]": this.page.currentPage,
      //   "queryParams[pageSize]": this.page.pageSize
      // };
      // const res = await enterpriseLicPageAPI(params);
      // if (res.code !== 200) {
      //   return this.$message.error("获取列表数据失败");
      // }
      // this.tableData = res.data.content;
      // this.page.totalResult = res.data.totalElements;
      this.isShow = true;
      this.isHide = false;
      if (this.cur == 0) {
        this.query.firstType = "firstType:1";
      } else if (this.cur == 1) {
        this.query.firstType = "firstType:2";
      } else if (this.cur == 2) {
        this.query.firstType = "firstType:3";
      }
    },
    tab(index) {
      this.cur = index;
    },
    iptValue(val) {
      this.query.typeSearch = val;
    },
    // 头部按钮
    headerButtonMethods(type) {
      switch (type) {
        case "chaxun":
          this.getTableData();
          break;
        case "xinzeng":
          this.$refs.editDialogRef.open();
          this.getTableData();
          break;
        case "chongzhi":
          this.query.firstType = "";
          this.query.secondType = "";
          this.query.name = "";
          this.query.queryHierarchy_orgName = "";
          this.getTableData();
          break;
      }
    },
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.editDialogRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteTableData(row.id);
          break;
      }
    },

    // 删除列表数据
    deleteTableData(id) {
      this.$confirm("你确定要删除此条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // enterpriseLicDeleteAPI({ ids: id }).then(res => {
        //   this.$message.success("删除成功");
        //   this.getTableData();
        // });
      });
    },
    myFunction(e, row) {
      let pdfUrl = this.imgUrl + row.attachment.url;
      this.pdfUrl = pdfUrl;
    },

    // 分页改变
    pageChange() {
      this.getTableData();
    },
    // 刷新
    update() {
      this.getTableData();
    },
    selectChangeEvent({ records }) {
      let ids = records.map((item) => item.id);
      this.ids = ids;
    },
  },
};
</script>

<style lang="scss" scoped>
.operation {
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
  }

  .tab-tilte {
    width: 90%;
  }

  ul li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .app {
    width: 600px;
    height: 400px;
    margin: 0 auto;
  }

  .tab-tilte li {
    float: left;
    width: 15%;
    padding: 10px 0;
    text-align: center;
    cursor: pointer;
  }

  /* 点击对应的标题添加对应的背景颜色 */
  .tab-tilte .active {
    color: #fff;
  }

  .tab-content div {
    //   float: left;
    width: 100%;
    line-height: 120px;
    text-align: center;
  }
}
</style>

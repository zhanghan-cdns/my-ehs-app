<!--suppress ALL -->
<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <div>
            <el-input placeholder="请输入证书名称" clearable v-model="query.restrictSpaceName"
                      style="width:200px;margin-right: 10px"></el-input>
            <el-select placeholder="请选择证书类型" clearable v-model="query.certificateType" :style="`width:${width}` ">
              <el-option v-for="item in entCertificateType" :key="item.id" :value="item.dictValue"
                         :label="item.dictValueName"></el-option>
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
    <edit-dialog ref="editDialogRef" :dictConfig="{entCertificateType}" @refresh="getTableData({})"></edit-dialog>
    <view-dialog ref="viewDialogRef" :dictConfig="{entCertificateType}"></view-dialog>
  </div>
</template>

<script>
import tableMixins from '@/mixins/table';
import commonMixin from '@/mixins/common'
import HeaderContainer from "@views/enterprise/dust/components/HeaderContainer";
import editDialog from "@views/enterprise/certificate/components/editDialog";
import {certificateListAPI, certificateDeleteAPI} from '@/api/enterprise/certificate/index.js';
import dictMixin from '@/mixins/dict'
import viewDialog from '@/views/enterprise/certificate/components/viewDialog';
import showFile from "@/components/show-file/index";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    HeaderContainer,
    editDialog,
    viewDialog,
    showFile
  },
  data() {
    return {
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center"
        },
        {
          field: "certificateName",
          title: "证书名称",
          align: "center"
        },
        {
          field: "certificateNum",
          title: "证书编号",
          align: "center"
        },
        {
          field: "certificateType.value",
          title: "证书类型",
          align: "center"
        },
        {
          field: "validTime",
          title: "有效日期",
          align: "center"
        },
        {
          field: "licenseIssuingAgency",
          title: "发证机构",
          align: "center"
        },
        {
          field: "relevantAttachment",
          title: "附件",
          align: "center",
          render: (h, {row}) => {
            if (Array.isArray(row.relevantAttachment) && row.relevantAttachment.length > 0) {
              return <showFile data={row.relevantAttachment}></showFile>
            } else {
              return <div>11</div>
            }
          }
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, {row, column, $index}) => {
            return (
              <operate-button
                on-operateButtonClick={type => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          }
        }
      ],
      query: {
        restrictSpaceName: "",
        certificateType: ""
      }
    }
  },
  created() {
    this.getTableData({});
  },
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData({query: this.query});
      } else if (type === "chongzhi") {
        this.query = {
          restrictSpaceName: "",
          certificateType: ""
        }
        this.getTableData({});
      }
    },
    async getTableData({query, domain}) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      query ? (params = {...params, ...query}) : params;
      const res = await certificateListAPI(params)
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
        this.page.currentPage = res.data.totalPages
      }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.viewDialogRef.open(row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
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
        type: "warning"
      })
        .then(async () => {
          const res = await certificateDeleteAPI({
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
  }
}
</script>

<style scoped>

</style>

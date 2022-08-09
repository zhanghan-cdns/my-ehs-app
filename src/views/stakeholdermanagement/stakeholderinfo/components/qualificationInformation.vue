<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <header-search :searchItem="search_item" :searchData="search_data" />
          <header-button @headerButtonClick="headerButtonMethods" :headerButtonList="headerButtonList"/>
        </div>
          <render-table
            :height="height"
            :data="tableData"
            :columns="columns"
          />
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <add-qualificationInformation  ref="addQualificationInformationRef"></add-qualificationInformation>
  </div>
</template>
<script>
import addQualificationInformation from "./addQualificationInformation.vue"
export default {
  name:"qualificationInformation",
  components:{addQualificationInformation},
  props:['operateButtonList','headerButtonList'],
  data() {
    return {
      height:480,
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      search_data: {},
      search_item: [
        {
          prop: "deptName",
          type: "Select",
          placeholder: "请选择级别",
          disabled: false,
          width: "200px",
          children:[]
        },
      ],
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
          field: "username",
          title: "资质证书名称",
          align: "center",
        },
        {
          field: "sex",
          title: "资质证书编号",
          align: "center",
        },
        {
          field: "sfz",
          title: "级别",
          align: "left",
          render: (h, { row, column, $index }) => {
            return <div style="color:#0A8DEF">二级</div>;
          },
        },
        {
          field: "departmentName",
          title: "取证日期",
          align: "center",
        },
        {
          field: "cj",
          title: "到期日期",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          render: (h, { row, column, $index }) => {
            return (
              <operate-button operateButtonList={this.operateButtonList}
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          },
        },
      ],
      tableData: [{}],
    };
  },
  mounted() {
    // this.getList();
  },
  methods: {
    //页码切换
    pageChange(data) {
      this.page.pageSize = data.pageSize;
      this.page.currentPage = data.currentPage;
      this.getList();
    },
    async getList() {
      let params = {
        ...this.search_data,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      getListAPI(params).then((res) => {});
    },
    headerButtonMethods(type) {
      console.log(type);
      if (type == "xinzeng") {
        this.$refs.addQualificationInformationRef.open(type);
      } else if (type == "chaxun") {
        this.getList();
      } else if (type == "chongzhi") {
      } 
    },
    change() {},
    pageChange() {},
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
           this.$refs.addQualificationInformationRef.open(type);
          break;
        case "bianji":
          this.$refs.addQualificationInformationRef.open(type);
          break;
        case "shanchu":
          this.deleteTable(row.id);
          break;
      }
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
.btn_orange {
  width: 101px;
  height: 31px;
  background: #fb7543;
  border-radius: 3px;
  border: 1px solid #c13417;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #ffffff;
  display: inline-block;
  margin-left: 10px;
  vertical-align: bottom;
}

.btn_blue {
  width: 101px;
  height: 31px;
  background: #2e82e2;
  border-radius: 3px;
  border: 1px solid #2e82e2;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #ffffff;
  display: inline-block;
  margin-left: 10px;
  vertical-align: bottom;
}
/deep/.cell_btn {
  height: 28px;
  margin: 0 auto;
  font-size: 12px;
  text-align: center;
  line-height: 28px;
  padding: 0 10px;
  border-radius: 2px;
  min-width: 64px;
  display: inline-block;
  box-sizing: border-box;
}
/deep/ .green {
  background: #fcfffb;
  border: 1px solid #52c41a;
  font-size: 14px;
  color: #52c41a;
  font-weight: 500;
}
/deep/ .red {
  background: #fff8f2;
  border: 1px solid #f5892b;
  font-size: 14px;
  color: #f5892b;
  font-weight: 500;
}
/deep/ .yellow {
  background: #fff9e9;
  border: 1px solid #ffbb00;
  font-size: 14px;
  color: #ffbb00;
  font-weight: 500;
}
</style>

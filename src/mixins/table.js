export default {
  data() {
    return {
      // 分页参数
      page: {
        currentPage: 1,
        pageSize: 15,
        totalResult: 0,
      },
      tableData: [],
      //响应式
      sizeCon: {
        height: 500
      },
    }
  },
  methods: {
    // 分页改变
    pageChange({ currentPage, pageSize }) {
      this.page.currentPage = currentPage;
      this.page.pageSize = pageSize;
      let domain={}
      // this.checkedNodes.forEach((item) => {
      //   domain[`domain[${item.type}]${item.code}`] = item.code;
      // });
      this.getTableData({query:this.query, domain});
    },

  }
}

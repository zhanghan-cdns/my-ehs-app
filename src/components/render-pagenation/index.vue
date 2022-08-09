<template>
  <div class="pagenation-table" v-loading="showLoading">
    <slot name="list"> </slot>
    <slot name="remark"> </slot>
    <div class="footer">
      <!-- <vxe-pager v-bind="pagePropsMixin" style="margin: 10px"
          :total="total"
          @current-change="(val)=>{console.log('val',val);showLoading = true;page = val;getList()}"
          @page-change="(val)=>{showLoading = true;pageSize = val;searchList()}"
          :layouts="layout">
      </vxe-pager> -->
      <vxe-pager
        v-bind="pagePropsMixin"
        :current-change="page"
        :page-size="pageSize"
        :total="total"
        @page-change="handlePageChange"
        perfect
        :layouts="layout"
      >
      </vxe-pager>
    </div>
  </div>
</template>
<script>
import request from "@/router/axios";
export default {
  name: "renderPagenation",
  data() {
    return {
      total: 0, //列表所有条数
      page: 1, //当前页码
      pageSizeOpts: [], //分页选项
      pageSize: null, //每页条数
      showLoading: false,
    };
  },
  mixins: [],
  props: {
    dataUrl: {
      type: String,
    },
    httpMethod: {
      type: String,
      default: "get",
    },
    // 搜索条件
    searchData: {
      type: Object,
      default() {
        return {};
      },
    },
    //分页码选项
    pageProps: {
      type: Object,
      default() {
        return {};
      },
    },
    layout: {
      type: String,
      default() {
        return ["Total", "Sizes", "PrevPage", "Number", "NextPage", "FullJump"];
      },
    },
  },
  computed: {
    // page组件的props混合
    pagePropsMixin() {
      return {
        background: true,
        layouts: [
          "PrevJump",
          "PrevPage",
          "Number",
          "JumpNumber",
          "NextPage",
          "NextJump",
          "Sizes",
          "Jump",
          "FullJump",
          "PageCount",
          "Total",
        ], //默认全部功能
        ...this.pageProps, //根据外部定义覆盖
        total: this.total, //当前总数，内部维护
        "page-sizes": this.pageSizeOpts, //根据情况取值
        "page-size": this.pageSize, //默认取分页码选项第一个
        "current-page": this.page, //当前分页数，内部维护
      };
    },
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化参数
    init() {
      // 设置pageSizeOpts,pageSize初始值
      this.pageSizeOpts = this.pageProps["page-sizes"]
        ? this.pageProps["page-sizes"]
        : [10, 20, 30, 40];
      this.pageSize = this.pageSizeOpts[0];
    },
    handlePageChange({ currentPage, pageSize }) {
      this.page = currentPage;
      this.pageSize = pageSize;
      this.getList();
    },
    // 获取当前页数据
    getList() {
      return new Promise((resolve, reject) => {
        this.showLoading = true;
        var searchData = {
          ...this.searchData,
          size: this.pageSize, //每页的数量
          current: this.page, //当前页
        };
        request({
          url: this.dataUrl,
          method: this.httpMethod,
          searchData,
        }).then(
          (res) => {
            var data = res.data;
            this.showLoading = false;
            this.total = data.total * 1;
            if (data.records.length == 0 && this.page > 1) {
              this.page = this.page - 1;
              this.getList().then(
                () => {
                  resolve();
                },
                () => {
                  reject();
                }
              );
            } else {
              this.$emit("input", data.records);
              this.$emit("total", this.total);
              resolve();
            }
          },
          (err) => {
            this.showLoading = false;
            this.$emit("input", []);
            this.total = 0;
            reject();
          }
        );
      });
    },
    // 获取第一页数据
    searchList() {
      return new Promise((resolve, reject) => {
        this.page = 1; //回到第一页
        this.showLoading = true;
        this.getList().then(
          () => {
            resolve();
          },
          () => {
            reject();
          }
        );
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.pagenation-table {
  // height: 100%;
  .footer {
    text-align: right;
    // margin-top: 8px;
  }
}
</style>
import {reactive, toRefs,ref} from '@vue/composition-api'
import {requestGetAPI} from "@/api/common";

export function useTable() {
  const tableState = reactive({
    // 分页参数
    page: {
      currentPage: 1,
      pageSize: 15,
      totalResult: 0,
    },
    //响应式
    sizeCon: {
      height: 500
    },
    tableData:[1]
  })
  const requestUrl = ref('')
  const getTableData = async ({query, domain}) => {
    let params = {
      "queryParams[pageNum]": tableState.page.currentPage,
      "queryParams[pageSize]": tableState.page.pageSize,
      ...domain,
    };
    query ? (params = {...params, ...query}) : params;
    const res = await requestGetAPI(requestUrl.value, params)
    if (res.code === 200) {
      tableState.tableData = res.data.content;
      tableState.page.totalResult = res.data.totalElements;
      tableState.page.currentPage = res.data.totalPages
    }

  }
  const pageChange = ({currentPage, pageSize}) => {
    tableState.page.currentPage = currentPage;
    tableState.page.pageSize = pageSize;
    // tableState.getTableData({query:tableState.query, domain});
  }
  return {
    ...toRefs(tableState),
    pageChange,
    getTableData
  }
}

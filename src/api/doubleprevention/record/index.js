
import request from "@/router/axios";

const  url = `/api/doubleprevention/record/view`
//双预防-- 风险管控措施历史执行任务列表
export const recordListAPI = (params) =>
  request({
    url: `${url}`,
    method: "get",
    params: params,
  });

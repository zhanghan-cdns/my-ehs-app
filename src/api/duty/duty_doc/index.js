import request from "@/router/axios";

const safeInfoUrl = `/api/enterprise/duty_doc`
const safeRecord = `/api/enterprise/duty_doc_record`


//目标职责-安全责任书下发-列表
export const safeInfoListAPI = (params) =>
  request({
    url: `${safeInfoUrl}/list`,
    method: "get",
    params: params,
  });

//目标职责-安全责任书下发-创建
export const safeInfoCreateAPI = (data) =>
  request({
    url: `${safeInfoUrl}/create`,
    method: "post",
    data: data,
  });

//目标职责-安全责任书下发-查看
export const safeInfoViewAPI = (params) =>
  request({
    url: `${safeInfoUrl}/view`,
    method: "get",
    params: params,
  });

//目标职责-安全责任书下发-修改
export const safeInfoUpdateAPI = (data) =>
  request({
    url: `${safeInfoUrl}/update`,
    method: "put",
    data: data,
  });

//目标职责-安全责任书下发-删除
export const safeInfoDeleteAPI = (params) =>
  request({
    url: `${safeInfoUrl}/delete`,
    method: "delete",
    params: params,
  });

// 下发签订 是否是员工
export const safeInfoStatusAPI = (params) =>
  request({
    url: `${safeInfoUrl}/list_status`,
    method: "get",
    params: params,
  });

// 下发签订 是否是上级签订
export const safeInfoLeaderAPI = (params) =>
  request({
    url: `${safeInfoUrl}/list_leader`,
    method: "get",
    params: params,
  });


//目标职责-主管签订-创建
export const safeRecordCreateAPI = (data) =>
  request({
    url: `${safeRecord}/create`,
    method: "post",
    data: data,
  });

  //目标职责-批量下发下发
export const safeInfoSendAPI = (params) =>
request({
  url: `${safeInfoUrl}/batch_send`,
  method: "delete",
  params: params,
});



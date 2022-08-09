import request from "@/router/axios";
let BASE_URL = `/api/enterprise/relatedPartyAssess`;
let BASE_URL_CON = `/api/enterprise/assessmentContent`;

//评定管理-列表
export const getListAPI = (params) =>
  request({
    url: `${BASE_URL}/list`,
    method: "GET",
    params: params,
  });

//评定管理-创建
export const createAPI = (params) =>
  request({
    url: `${BASE_URL}/create`,
    method: "POST",
    data: params,
  });

//评定管理-详情
export const getDetailAPI = (params) =>
  request({
    url: `${BASE_URL}/view`,
    method: "GET",
    params: params,
  });

//评定管理-创建
export const updateAPI = (params) =>
  request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: params,
  });

//评定管理-删除
export const deleteAPI = (params) =>
  request({
    url: `${BASE_URL}/delete`,
    method: "DELETE",
    params: params,
  });

//评定管理-导入
export const importdataAPI = (params) =>
  request({
    url: `${BASE_URL}/importdata`,
    method: "POST",
    data: params,
    // headers: {
    //   type: "upload",
    // },
  });

//评定管理-导入模板
export const importtemplateAPI = (params) =>
  request({
    url: `${BASE_URL}/importtemplate`,
    method: "GET",
    params: params,
  });

// ---------------------

  //评定内容设置-列表
export const getListConAPI = (params) =>
request({
  url: `${BASE_URL_CON}/list`,
  method: "GET",
  params: params,
});

//评定内容设置-创建
export const createConAPI = (params) =>
request({
  url: `${BASE_URL_CON}/create`,
  method: "POST",
  data: params,
});

//评定内容设置-详情
export const getDetailConAPI = (params) =>
request({
  url: `${BASE_URL_CON}/view`,
  method: "GET",
  params: params,
});

//评定内容设置-创建
export const updateConAPI = (params) =>
request({
  url: `${BASE_URL_CON}/update`,
  method: "PUT",
  data: params,
});

//评定内容设置-删除
export const deleteConAPI = (params) =>
request({
  url: `${BASE_URL_CON}/delete`,
  method: "DELETE",
  params: params,
});

//评定内容设置-导入
export const importdataConAPI = (params) =>
request({
  url: `${BASE_URL}/importdata`,
  method: "POST",
  data: params,
  // headers: {
  //   type: "upload",
  // },
});

//评定内容设置-导入模板
export const importtemplateConAPI = (params) =>
request({
  url: `${BASE_URL}/importtemplate`,
  method: "GET",
  params: params,
});


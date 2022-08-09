import request from "@/router/axios";

const projectmanageUrl = `/api/enterprise/projectManagement`;
const contractorUrl = `/api/enterprise/relatedPartyInfo`;
const informationUrl = `/api/enterprise/Violationinfo`;

//项目管理-列表
export const projectmanageListAPI = (params) => {
  return request({
    url: `${projectmanageUrl}/list`,
    method: "get",
    params: params,
  });
};
// 项目管理-创建
export const projectmanageCreateAPI = (params) => {
  return request({
    url: `${projectmanageUrl}/create`,
    method: "post",
    data: params,
  });
};
// 项目管理-查看
export const projectmanageViewAPI = (params) => {
  return request({
    url: `${projectmanageUrl}/view`,
    method: "get",
    params: params,
  });
};
// 项目管理-编辑
export const projectmanageUpdateAPI = (params) => {
  return request({
    url: `${projectmanageUrl}/update`,
    method: "put",
    data: params,
  });
};
//添加违章信息-项目名称下拉框
export const projectmanageAllAPI = (params) => {
  return request({
    url: `${projectmanageUrl}/all-project-management`,
    method: "get",
    params: params,
  });
};
 // 添加违章信息-违章相关方下拉框
 export const informationUrlrelateAPI = (params) => {
  return request({
    url: `${contractorUrl}/all-related-party`,
    method: "get",
    params: params,
  });
};
//项目管理-删除
export const projectmanageDeleteAPI = (params) => {
  return request({
    url: `${projectmanageUrl}/Delete`,
    method: "delete",
    params: params,
  });
};
// 选择承包商-列表
export const contractorUrlListAPI = (params) => {
  return request({
    url: `${contractorUrl}/all-related-party`,
    method: "get",
    params: params,
  });
};

// 违章信息-查看历史记录
export const informationUrlViewListAPI = (params) => {
  return request({
    url: `${informationUrl}/list2`,
    method: "get",
    params: params,
  });
};
// 添加违章信息-列表
export const informationUrlListAPI = (params) => {
  return request({
    url: `${informationUrl}/list`,
    method: "get",
    params: params,
  });
};

 //添加违章信息-创建
export const informationUrlCreateAPI = (params) => {
  return request({
    url: `${informationUrl}/create`,
    method: "post",
    data: params,
  });
};
// 添加违章信息-删除
export const informationUrlDeleteAPI = (params) => {
  return request({
    url: `${informationUrl}/delete`,
    method: "get",
    params: params,
  });
};
// 添加违章信息-查看
export const informationUrlViewAPI = (params) => {
  return request({
    url: `${informationUrl}/view`,
    method: "get",
    params: params,
  });
};
// 添加违章信息-修改
export const informationUrlUpdateAPI = (params) => {
  return request({
    url: `${informationUrl}/update`,
    method: "put",
    params: params,
  });
};

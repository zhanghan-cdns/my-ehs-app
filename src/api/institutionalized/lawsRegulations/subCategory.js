import request from "@/router/axios";

const subCategoryUrl = `/api/enterprise/subcategory`;

//法律法规识别-小类别-列表树
export const subCategoryListAPI = params =>
  request({
    url: `${subCategoryUrl}/listTree`,
    method: "get",
    params: params
  });

//法律法规识别-小类别-创建
export const subCategoryCreateAPI = data =>
  request({
    url: `${subCategoryUrl}/create`,
    method: "post",
    data: data
  });

//法律法规识别-小类别-查看
export const subCategoryViewAPI = params =>
  request({
    url: `${subCategoryUrl}/view`,
    method: "get",
    params: params
  });

//法律法规识别-小类别-修改
export const subCategoryUpdateAPI = data =>
  request({
    url: `${subCategoryUrl}/update`,
    method: "put",
    data: data
  });

//法律法规识别-小类别-删除
export const subCategoryDeleteAPI = params =>
  request({
    url: `${subCategoryUrl}/delete`,
    method: "delete",
    params: params
  });
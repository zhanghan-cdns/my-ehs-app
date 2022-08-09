import request from "@/router/axios";

const standardLibraryUrl = `/api/enterprise/lawsregulationslibrary`;

//法律法规识别-法规标准库-列表
export const standardLibraryListAPI = params =>
  request({
    url: `${standardLibraryUrl}/page`,
    method: "get",
    params: params
  });

//法律法规识别-法规标准库-创建
export const standardLibraryCreateAPI = data =>
  request({
    url: `${standardLibraryUrl}/create`,
    method: "post",
    data: data
  });

//法律法规识别-法规标准库-查看
export const standardLibraryViewAPI = params =>
  request({
    url: `${standardLibraryUrl}/view`,
    method: "get",
    params: params
  });

//法律法规识别-法规标准库-修改
export const standardLibraryUpdateAPI = data =>
  request({
    url: `${standardLibraryUrl}/update`,
    method: "put",
    data: data
  });

//法律法规识别-法规标准库-删除
export const standardLibraryDeleteAPI = params =>
  request({
    url: `${standardLibraryUrl}/delete`,
    method: "delete",
    params: params
  });

//法律法规识别-法规标准库-识别
export const standardLibraryDistinguishAPI = params =>
  request({
    url: `${standardLibraryUrl}/distinguish`,
    method: "put",
    params: params
  });
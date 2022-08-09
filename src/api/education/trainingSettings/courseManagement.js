import request from "@/router/axios";
let BASE_URL = `/api/education/courseManagement`;

//课程设置-创建
export const createAPI = (params) =>
  request({
    url: `${BASE_URL}/create`,
    method: "post",
    data: params,
  });

//课程设置-获取列表
export const getListAPI = (params) =>
  request({
    url: `${BASE_URL}/list`,
    method: "get",
    params: params,
  });

//课程设置-获取详情
export const getDetailAPI = (params) =>
  request({
    url: `${BASE_URL}/view`,
    method: "get",
    params: params,
  });

//课程设置-删除
export const deleteAPI = (params) =>
  request({
    url: `${BASE_URL}/delete`,
    method: "DELETE",
    params: params,
  });

//课程设置-更新
export const updateAPI = (params) =>
  request({
    url: `${BASE_URL}/update`,
    method: "put",
    data: params,
  });

//课程设置-获取课程列表
export const courseListAllAPI = (params) =>
  request({
    url: `${BASE_URL}/listAll`,
    method: "GET",
    params: params,
  });
//课程设置-未绑定规则课程列表
export const bindExamAPI = (params) =>
  request({
    url: `${BASE_URL}/bindExam `,
    method: "GET",
    params: params,
  });
//获取课程课件
export const getCourseWareAPI = (params) =>
  request({
    url: `${BASE_URL}/getCourseWare`,
    method: "GET",
    params: params,
  });
//获取所有课程列表
export const getCourseListAllAPI = (params) =>
  request({
    url: `${BASE_URL}/listAll`,
    method: "GET",
    params: params,
  });

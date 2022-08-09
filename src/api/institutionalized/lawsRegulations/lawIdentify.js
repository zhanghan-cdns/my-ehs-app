import request from "@/router/axios";

const lawIdentifyUrl = `/api/enterprise/lawsregulationsdiscern`;

//法律法规识别-法规识别-列表
export const lawIdentifyListAPI = params =>
  request({
    url: `${lawIdentifyUrl}/page`,
    method: "get",
    params: params
  });

//法律法规识别-法规识别-创建
export const lawIdentifyCreateAPI = data =>
  request({
    url: `${lawIdentifyUrl}/create`,
    method: "post",
    data: data
  });

//法律法规识别-法规识别-查看
export const lawIdentifyViewAPI = params =>
  request({
    url: `${lawIdentifyUrl}/view`,
    method: "get",
    params: params
  });

//法律法规识别-法规识别-修改
export const lawIdentifyUpdateAPI = data =>
  request({
    url: `${lawIdentifyUrl}/update`,
    method: "put",
    data: data
  });

//法律法规识别-法规识别-删除
export const lawIdentifyDeleteAPI = params =>
  request({
    url: `${lawIdentifyUrl}/delete`,
    method: "delete",
    params: params
  });
import request from "@/router/axios";

const hazardVoidEquipAlarmUrl = `/api/hazard/hazardVoidEquipAlarm`

//重大危险源-视频AI报警管理-列表
export const hazardVoidEquipAlarmListAPI = (params) =>
  request({
    url: `${hazardVoidEquipAlarmUrl}/list`,
    method: "get",
    params: params,
  });

//重大危险源-视频AI报警管理-创建
export const hazardVoidEquipAlarmCreateAPI = (data) =>
  request({
    url: `${hazardVoidEquipAlarmUrl}/create`,
    method: "post",
    data: data,
  });

//重大危险源-视频AI报警管理-查看
export const hazardVoidEquipAlarmViewAPI = (params) =>
  request({
    url: `${hazardVoidEquipAlarmUrl}/view`,
    method: "get",
    params: params,
  });

//重大危险源-视频AI报警管理-修改
export const hazardVoidEquipAlarmUpdateAPI = (data) =>
  request({
    url: `${hazardVoidEquipAlarmUrl}/update`,
    method: "put",
    data: data,
  });

//重大危险源-视频AI报警管理-删除
export const hazardVoidEquipAlarmDeleteAPI = (params) =>
  request({
    url: `${hazardVoidEquipAlarmUrl}/delete`,
    method: "delete",
    params: params,
  });

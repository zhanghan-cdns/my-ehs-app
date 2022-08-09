import request from "@/router/axios";

const hazardEquipAlarmUrl = `/api/hazard/indexAlarm`;

//重大危险源-报警管理-列表
export const hazardEquipAlarmListAPI = params =>
  request({
    url: `${hazardEquipAlarmUrl}/list`,
    method: "get",
    params: params
  });

//重大危险源-报警管理-创建
export const hazardEquipAlarmCreateAPI = data =>
  request({
    url: `${hazardEquipAlarmUrl}/create`,
    method: "post",
    data: data
  });

//重大危险源-报警管理-查看
export const hazardEquipAlarmViewAPI = params =>
  request({
    url: `${hazardEquipAlarmUrl}/view`,
    method: "get",
    params: params
  });

// 重大危险源-报警管理-查看波动图
export const hazardEquipAlarmHostListAPI = params =>
  request({
    url: `${hazardEquipAlarmUrl}/hostList`,
    method: "get",
    params: params
  });

//重大危险源-报警管理-修改
export const hazardEquipAlarmUpdateAPI = data =>
  request({
    url: `${hazardEquipAlarmUrl}/update`,
    method: "put",
    data: data
  });

//重大危险源-报警管理-删除
export const hazardEquipAlarmDeleteAPI = params =>
  request({
    url: `${hazardEquipAlarmUrl}/delete`,
    method: "delete",
    params: params
  });

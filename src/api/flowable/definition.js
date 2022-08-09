// import request from '@/utils/request'
import request from '@/router/axios';

// 查询流程定义列表
export function listDefinition(query) {
  return request({
    url: '/api/flowable/definition/list',
    method: 'get',
    params: query
  })
}

// 部署流程实例
export function definitionStart(procDefId,data) {
  return request({
    url: '/api/flowable/definition/start?procDefId=' + procDefId,
    method: 'post',
    data: data
  })
}

// 获取流程变量
export function getProcessVariables(taskId) {
  return request({
    url: '/api/flowable/task/processVariables/' + taskId,
    method: 'get'
  })
}

// 激活/挂起流程
export function updateState(params) {
  return request({
    url: '/api/flowable/definition/updateState',
    method: 'put',
    params: params
  })
}

// 指定流程办理人员列表
export function userList(query) {
  return request({
    url: '/api/flowable/definition/userList',
    method: 'get',
    params: query
  })
}

// 指定流程办理组列表
export function roleList(query) {
  return request({
    url: '/api/flowable/definition/roleList',
    method: 'get',
    params: query
  })
}
// 生成流程图
export function createDiagram(processId) {
  return request({
    url: '/api/flowable/task/diagram?processId=' + processId,
    method: 'get',
    responseType: 'blob'
  })
}

// 读取xml文件
export function readXml(deployId) {
  return request({
    url: '/api/flowable/definition/readXml?deployId=' + deployId,
    method: 'get'
  })
}
// 读取image文件
export function readImage(deployId) {
  return request({
    url: '/api/flowable/definition/readImage?deployId=' + deployId,
    method: 'get'
  })
}

// 读取image文件
export function getFlowViewer(procInsId) {
  return request({
    url: '/api/flowable/task/flowViewer/' + procInsId,
    method: 'get'
  })
}

// 读取xml文件
export function saveXml(data) {
  return request({
    url: '/api/flowable/definition/save',
    method: 'post',
    data: data
  })
}

// 新增流程定义
export function addDeployment(data) {
  return request({
    url: '/api/system/deployment',
    method: 'post',
    data: data
  })
}

// 修改流程定义
export function updateDeployment(data) {
  return request({
    url: '/api/system/deployment',
    method: 'put',
    data: data
  })
}

// 删除流程定义
export function delDeployment(query) {
  return request({
    url: '/api/flowable/definition/delete',
    method: 'delete',
    params: query
  })
}

// 导出流程定义
export function exportDeployment(query) {
  return request({
    url: '/api/system/deployment/export',
    method: 'get',
    params: query
  })
}

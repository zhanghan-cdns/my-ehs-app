// import request from '@/utils/request'
import request from '@/router/axios';
import da from "element-ui/src/locale/lang/da";

// 查询待办任务列表
export function todoList(query) {
  return request({
    url: '/api/flowable/task/todoList',
    method: 'get',
    params: query
  })
}

// 完成任务
export function complete(data) {
  return request({
    url: '/api/flowable/task/complete',
    method: 'post',
    data: data
  })
}

// 委派任务
export function delegate(data) {
  return request({
    url: '/api/flowable/task/delegate',
    method: 'post',
    data: data
  })
}

// 退回任务
export function returnTask(data) {
  return request({
    url: '/api/flowable/task/return',
    method: 'post',
    data: data
  })
}

// 驳回任务
export function rejectTask(data) {
  return request({
    url: '/api/flowable/task/reject',
    method: 'post',
    data: data
  })
}

// 可退回任务列表
export function returnList(data) {
  return request({
    url: '/api/flowable/task/returnList',
    method: 'post',
    data: data
  })
}

// 下一节点
export function getNextFlowNode(data) {
  return request({
    url: '/api/flowable/task/nextFlowNode',
    method: 'post',
    data: data
  })
}

// 部署流程实例
export function deployStart(deployId) {
  return request({
    url: '/api/flowable/process/startFlow/' + deployId,
    method: 'get',
  })
}

// 查询流程定义详细
export function getDeployment(id) {
  return request({
    url: '/api/system/deployment/' + id,
    method: 'get'
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
export function delDeployment(id) {
  return request({
    url: '/api/system/deployment/' + id,
    method: 'delete'
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

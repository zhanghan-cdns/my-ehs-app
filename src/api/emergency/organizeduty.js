import request from '@/router/axios';

const dutyUrl = `/api/enterprise/emergency/organizeDuty`

// 应急组织职责列表
export const organizeDutyListAPI = (params) => {
  return request({
    url: `${dutyUrl}/list`,
    method: 'get',
    params: params
  })
}

// 应急组织职责分页列表
export const organizeDutyPageAPI = (params) => {
  return request({
    url: `${dutyUrl}/page`,
    method: 'get',
    params: params
  })
}

// 应急组织职责创建
export const organizeDutyCreateAPI = (params) => {
  return request({
    url: `${dutyUrl}`,
    method: 'post',
    data: params
  })
}

// 应急组织职责查看
export const organizeDutyViewAPI = (params) => {
  return request({
    url: `${dutyUrl}`,
    method: 'get',
    params: params
  })
}

// 应急组织职责更新
export const organizeDutyUpdateAPI = (params) => {
  return request({
    url: `${dutyUrl}`,
    method: 'put',
    data: params
  })
}

// 应急组织职责删除
export const organizeDutyDeleteAPI = (params) => {
  return request({
    url: `${dutyUrl}`,
    method: 'delete',
    params: params
  })
}
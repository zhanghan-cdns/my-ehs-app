import request from '@/router/axios';

const expertUrl = `/api/enterprise/emergency/expert`

// 应急专家列表
export const expertListAPI = (params) => {
  return request({
    url: `${expertUrl}/list`,
    method: 'get',
    params: params
  })
}

// 应急专家分页列表
export const expertPageAPI = (params) => {
  return request({
    url: `${expertUrl}/page`,
    method: 'get',
    params: params
  })
}

// 应急专家创建
export const expertCreateAPI = (params) => {
  return request({
    url: `${expertUrl}`,
    method: 'post',
    data: params
  })
}

// 应急专家查看
export const expertViewAPI = (params) => {
  return request({
    url: `${expertUrl}`,
    method: 'get',
    params: params
  })
}

// 应急专家更新
export const expertUpdateAPI = (params) => {
  return request({
    url: `${expertUrl}`,
    method: 'put',
    data: params
  })
}

// 应急专家删除
export const expertDeleteAPI = (params) => {
  return request({
    url: `${expertUrl}`,
    method: 'delete',
    params: params
  })
}
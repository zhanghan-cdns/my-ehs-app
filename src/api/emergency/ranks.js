import request from '@/router/axios';

const ranksUrl = `/api/enterprise/emergency/ranks`

// 应急队伍列表
export const ranksListAPI = (params) => {
  return request({
    url: `${ranksUrl}/list`,
    method: 'get',
    params: params
  })
}

// 应急队伍分页列表
export const ranksPageAPI = (params) => {
  return request({
    url: `${ranksUrl}/page`,
    method: 'get',
    params: params
  })
}

// 应急队伍创建
export const ranksCreateAPI = (params) => {
  return request({
    url: `${ranksUrl}`,
    method: 'post',
    data: params
  })
}

// 应急队伍查看
export const ranksViewAPI = (params) => {
  return request({
    url: `${ranksUrl}`,
    method: 'get',
    params: params
  })
}

// 应急队伍更新
export const ranksUpdateAPI = (params) => {
  return request({
    url: `${ranksUrl}`,
    method: 'put',
    data: params
  })
}

// 应急队伍删除
export const ranksDeleteAPI = (params) => {
  return request({
    url: `${ranksUrl}`,
    method: 'delete',
    params: params
  })
}
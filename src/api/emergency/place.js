import request from '@/router/axios';

const placeUrl = `/api/enterprise/emergency/place`

// 避难场所列表
export const placeListAPI = (params) => {
  return request({
    url: `${placeUrl}/list`,
    method: 'get',
    params: params
  })
}

// 避难场所分页列表
export const placePageAPI = (params) => {
  return request({
    url: `${placeUrl}/page`,
    method: 'get',
    params: params
  })
}

// 避难场所创建
export const placeCreateAPI = (params) => {
  return request({
    url: `${placeUrl}`,
    method: 'post',
    data: params
  })
}

// 避难场所查看
export const placeViewAPI = (params) => {
  return request({
    url: `${placeUrl}`,
    method: 'get',
    params: params
  })
}

// 避难场所更新
export const placeUpdateAPI = (params) => {
  return request({
    url: `${placeUrl}`,
    method: 'put',
    data: params
  })
}

// 避难场所删除
export const placeDeleteAPI = (params) => {
  return request({
    url: `${placeUrl}`,
    method: 'delete',
    params: params
  })
}
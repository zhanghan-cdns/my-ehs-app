import request from '@/router/axios';

const hospitalUrl = `/api/enterprise/emergency/hospital`

// 应急队伍列表
export const hospitalListAPI = (params) => {
  return request({
    url: `${hospitalUrl}/list`,
    method: 'get',
    params: params
  })
}

// 应急队伍分页列表
export const hospitalPageAPI = (params) => {
  return request({
    url: `${hospitalUrl}/page`,
    method: 'get',
    params: params
  })
}

// 应急队伍创建
export const hospitalCreateAPI = (params) => {
  return request({
    url: `${hospitalUrl}`,
    method: 'post',
    data: params
  })
}

// 应急队伍查看
export const hospitalViewAPI = (params) => {
  return request({
    url: `${hospitalUrl}`,
    method: 'get',
    params: params
  })
}

// 应急队伍更新
export const hospitalUpdateAPI = (params) => {
  return request({
    url: `${hospitalUrl}`,
    method: 'put',
    data: params
  })
}

// 应急队伍删除
export const hospitalDeleteAPI = (params) => {
  return request({
    url: `${hospitalUrl}`,
    method: 'delete',
    params: params
  })
}
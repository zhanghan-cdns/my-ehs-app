import request from '@/router/axios';

const reserveBankUrl = `/api/enterprise/emergency/reserveBank`

// 应急储备库列表
export const reserveBankListAPI = (params) => {
  return request({
    url: `${reserveBankUrl}/list`,
    method: 'get',
    params: params
  })
}

// 应急储备库分页列表
export const reserveBankPageAPI = (params) => {
  return request({
    url: `${reserveBankUrl}/page`,
    method: 'get',
    params: params
  })
}

// 应急储备库创建
export const reserveBankCreateAPI = (params) => {
  return request({
    url: `${reserveBankUrl}`,
    method: 'post',
    data: params
  })
}

// 应急储备库查看
export const reserveBankViewAPI = (params) => {
  return request({
    url: `${reserveBankUrl}`,
    method: 'get',
    params: params
  })
}

// 应急储备库更新
export const reserveBankUpdateAPI = (params) => {
  return request({
    url: `${reserveBankUrl}`,
    method: 'put',
    data: params
  })
}

// 应急储备库删除
export const reserveBankDeleteAPI = (params) => {
  return request({
    url: `${reserveBankUrl}`,
    method: 'delete',
    params: params
  })
}
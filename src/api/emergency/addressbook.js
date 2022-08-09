import request from '@/router/axios';

const bookUrl = `/api/enterprise/emergency/addressBook`

// 应急通讯录列表
export const addressBookListAPI = (params) => {
  return request({
    url: `${bookUrl}/list`,
    method: 'get',
    params: params
  })
}

// 应急通讯录分页列表
export const addressBookPageAPI = (params) => {
  return request({
    url: `${bookUrl}/page`,
    method: 'get',
    params: params
  })
}

// 应急通讯录创建
export const addressBookCreateAPI = (params) => {
  return request({
    url: `${bookUrl}`,
    method: 'post',
    data: params
  })
}

// 应急通讯录查看
export const addressBookViewAPI = (params) => {
  return request({
    url: `${bookUrl}`,
    method: 'get',
    params: params
  })
}

// 应急通讯录更新
export const addressBookUpdateAPI = (params) => {
  return request({
    url: `${bookUrl}`,
    method: 'put',
    data: params
  })
}

// 应急通讯录删除
export const addressBookDeleteAPI = (params) => {
  return request({
    url: `${bookUrl}`,
    method: 'delete',
    params: params
  })
}
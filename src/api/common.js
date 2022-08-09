import request from '@/router/axios';
// get方法
export const requestGetAPI = (url, params) => {
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
// post方法
export const requestPostAPI = (url, data) => {
  return request({
    url: url,
    method: 'post',
    data: data
  })
}

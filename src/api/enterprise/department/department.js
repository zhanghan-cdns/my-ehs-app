import request from '@/router/axios';

//获取用户列表
export const depListAPI = (params) => {
  return request({
      url: '/api/enterprise/dept/list-tree',
      method: 'get',
      params: params
  })
}

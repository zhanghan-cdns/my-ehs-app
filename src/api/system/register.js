import request from '@/router/axios';
export const registerAPI = (data) => {
  return request({
    url: '/api/enterprise/entbase/register',
    method: 'post',
    data: data
  })
}

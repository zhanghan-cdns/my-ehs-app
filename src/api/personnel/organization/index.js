import request from '@/router/axios';

// 企业-企业信息-查看
export const enterpriseNewListAPI = () => request({
  url: '/api/enterprise/info/view',
  method: 'get',
});

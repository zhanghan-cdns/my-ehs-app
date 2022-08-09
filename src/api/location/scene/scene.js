import request from '@/router/axios';
// 场景回溯API
export const sceneRecallAPI = (params) => request({
  url: '/api/location/position/get-finalposition',
  method: 'get',
  params: params
});

// 查看热力图
export const heatMapAPI = (params) => request({
  url: '/api/location/position/get-heat-map',
  method: 'get',
  params: params
});

// 查询历史轨迹
export const historyPathAPI = (params) => request({
  url: '/api/location/position/get-history',
  method: 'get',
  params: params
});

// 根据类型获取对象
export const getThingAPI = (params) => request({
  url: "/api/location/things/get-list",
  method: 'get',
  params: params
})

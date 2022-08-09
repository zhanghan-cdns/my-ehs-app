import request from '@/router/axios';

//获取字典键列表
export const dictKeyListAPI = (params) => {
  return request({
    url: '/api/system/dict/key/list',
    method: 'get',
    params: params
  })
}
// 新增字典键
export const createDictKeyDataAPI = (params) => {
	return request({
		url: '/api/system/dict/key',
		method: 'post',
		data: params
	})
}
// 修改字典键
export const updataDictKeyDataAPI = (params) => {
	return request({
		url: '/api/system/dict/key',
		method: 'put',
		data: params
	})
}
// 删除字典键列表
export const deleteDictKeyDataAPI = (params) => {
	return request({
		url: '/api/system/dict/key',
		method: 'delete',
		params: params
	})
}
// 回填字典键
export const returnDictKeyDataAPI = (params) => {
  return request({
    url: '/api/system/dict/key',
    method: 'get',
    params: params
  })
}

//获取字典值列表
export const dictValueListAPI = (params) => {
  return request({
    url: '/api/system/dict/value/list',
    method: 'get',
    params: params
  })
}
// 新增字典值
export const createDictValueDataAPI = (params) => {
	return request({
		url: '/api/system/dict/value',
		method: 'post',
		data: params
	})
}
// 修改字典值
export const updataDictValueDataAPI = (params) => {
	return request({
		url: '/api/system/dict/value',
		method: 'put',
		data: params
	})
}
// 删除字典值列表
export const deleteDictValueDataAPI = (params) => {
	return request({
		url: '/api/system/dict/value',
		method: 'delete',
		params: params
	})
}
// 回填字典值
export const returnDictValueDataAPI = (params) => {
  return request({
    url: '/api/system/dict/value',
    method: 'get',
    params: params
  })
}
// 快速加载
export const fastGetDictAPI = (params) =>{
  return request({
    url: '/api/system/dict/get',
    method: 'get',
    params: {"key": params},
  })
}

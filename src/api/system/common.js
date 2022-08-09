
import request from '@/router/axios';
// 树接口
export const treeData2API = (params) => {
  return request({
    url: '/api/domain/organization/tree-list',
    method: 'get',
    params: params
  })
}
// 注册树接口
export const treeListAPI = (params) => {
  return request({
    url: '/api/domain/organization/tree-list-out-login',
    method: 'get',
    params: params
  })
}
// 图片上传
export const uploadAPI = (params) => {
  return request({
    url: '/api/resource/file/upload',
    method: 'post',
    data: params,
    headers: {
      'type': 'upload'
    },
    timeout:300000
  })
}

// 责任整改部门下拉值
export const getDeptTreeAPI = (params) => {
  return request({
    url: '/api/system/department/getdepttree',
    method: 'get',
    params: params
  })
}
// 组织机构
export const xmtreeAPI = (params) => {
  return request({
    url: '/api/system/department/getxmtree',
    method: 'get',
    params: params
  })
}

// 按企业获取风险等级
export const riskPCQyAPI = (params) => {
  return request({
    url: '/api/enterprise/risk/statistical/data8',
    method: 'get',
    params: params
  })
}


// 获取部门信息
export const listnopageAPI = (params) => {
  return request({
    url: '/api/system/dept/listtree',
    method: 'get',
    params: params
  })
}
// 获取部门列表
export const getDeptListAPI = (params) => {
  return request({
    url: '/api/enterprise/dept/list-tree',
    method: 'get',
    params: params
  })
}


// 获取全部树(非懒加载)
export const getAllTreeAPI = (params) => {
  return request({
    url: '/api/domain/organization/early-tree-list',
    method: 'get',
    params: params
  })
}

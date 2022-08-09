import request from '@/router/axios';

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
    return request({
      url: '/api/system/dict/data/type/' + dictType,
      method: 'get'
    })
  }
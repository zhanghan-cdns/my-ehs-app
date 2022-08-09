import request from '@/router/axios';

const emergencyMeasureUrl = `/api/enterprise/emergencyMeasure`

//获取应急列表
export const emergencyMeasureListAPI = (params) => {
    return request({
        url: `${emergencyMeasureUrl}/page`,
        method: 'get',
        params: params
    })
}
//获取应急编辑
export const emergencyMeasureUpdateAPI = (params) => {
    return request({
        url: `${emergencyMeasureUrl}/update`,
        method: 'put',
        data: params
    })
}
//获取应急删除
export const emergencyMeasuresDeleteAPI = (params) => {
    return request({
        url: `${emergencyMeasureUrl}/delete`,
        method: 'delete',
        params: params
    })
}
//获取应急新增
export const emergencyMeasurePostAPI = (params) => {
    return request({
        url: `${emergencyMeasureUrl}/create`,
        method: 'post',
        data: params
    })
}

// 应急数据回填
export const emergencyMeasureEchoDataAPI = (params) => {
    return request({
        url: `${emergencyMeasureUrl}/view`,
        method: 'get',
        params: params
    })
}

// 导入
export const emergencyMeasuresAPI = params => {
    return request({
        url: `${emergencyMeasureUrl}/import-data`,
        method: "post",
        data: params,
        headers: {
            type: "upload"
        }
    });
};
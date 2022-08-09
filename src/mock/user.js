import Mock from 'mockjs'
export default ({ mock }) => {
    if (!mock) return;
    // 用户登录
    Mock.mock('/user/login', 'post', {
        data: new Date().getTime() + ''
    });
    //用户退出
    Mock.mock('/user/logout', 'get', {
        data: true,
    });
    //刷新token
    Mock.mock('/user/refesh', 'post', {
        data: new Date().getTime() + ''
    });

    //获取表格数据
    Mock.mock('/person/list', 'get', () => {
        // let list = []
        // for (let i = 0; i < 5; i++) {
        //     list.push(Mock.mock({
        //         id: '@increment',
        //         name: Mock.mock('@cname'),
        //         username: Mock.mock('@last'),
        //         type: [0, 2],
        //         checkbox: [0, 1],
        //         'number|0-100': 0,
        //         datetime: 1532932422071,
        //         'sex|0-1': 0,
        //         moreselect: [0, 1],
        //         "grade": 0,
        //         address: Mock.mock('@cparagraph(1, 3)'),
        //         check: [1, 3, 4]
        //     }))
        // }
        return {
            "code": 200,
            "success": true,
            "data": {
                "records": [],
                "total": 0,
                "size": 10,
                "current": 1,
                "orders": [],
                "optimizeCountSql": true,
                "hitCount": false,
                "countId": "",
                "maxLimit": -1,
                "searchCount": true,
                "pages": 0
            },
            "msg": "操作成功"
        }
    })
    // 测试接口
    Mock.mock('/user/test','get',{
      data:'测试'
    })
}

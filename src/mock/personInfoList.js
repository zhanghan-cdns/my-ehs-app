import Mock from 'mockjs'
export default ({ mock }) => {
	if (!mock) return;
    // 测试表格接口
    Mock.mock('/api/person/list','get',{
        "records": [{
			Name: "张三",
			sex: "男",
			aimg: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
			JobNumber: "123456",
		  },
		  {
			Name: "张三",
			sex: "男",
			aimg: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
			JobNumber: "32班",
		  },{
			Name: "张三",
			sex: "男",
			aimg: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
			JobNumber: "123456",
		  },
		  {
			Name: "张三",
			sex: "男",
			aimg: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
			JobNumber: "32班",
		  },{
			Name: "张三",
			sex: "男",
			aimg: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
			JobNumber: "123456",
		  },
		  {
			Name: "张三",
			sex: "男",
			aimg: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
			JobNumber: "32班",
		  },{
			Name: "张三",
			sex: "男",
			aimg: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
			JobNumber: "123456",
		  },
		  {
			Name: "张三",
			sex: "男",
			aimg: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
			JobNumber: "32班",
		  },{
			Name: "张三",
			sex: "男",
			aimg: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
			JobNumber: "123456",
		  },
		  {
			Name: "张三",
			sex: "男",
			aimg: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
			JobNumber: "32班",
		  }],
		"total": 10,
		"size": 10,
		"current": 1,
		"orders": [],
		"optimizeCountSql": true,
		"hitCount": false,
		"countId": "",
		"maxLimit": -1,
		"searchCount": true,
		"pages": 0 
    })
}
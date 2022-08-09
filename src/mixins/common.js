import { BASE_URL } from '@/router/axios';
export default {
  data() {
    return {
      checkedNodes: null,//选中节点
    }
  },
  methods: {
    // 保存成功通知更新列表
    update() {
      this.getTableData();
    },
    // 树节点选中改变触发
    checkNode(data, { checkedKeys, checkedNodes }) {
      let domain = {};
      if(!checkedNodes) return
      this.checkedNodes = checkedNodes;
      checkedNodes.forEach((item) => {
        domain[`domain[${item.type}]${item.code}`] = item.code;
      });
      this.getTableData(this.query, domain);
    },
    // 下载文件
    downloadFile(name, fileurl) {
      let path = BASE_URL + '/resource/file/download?url=' + fileurl
      //方式二
      window.open(path);
    },
  }
}

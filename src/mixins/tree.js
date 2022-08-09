// 组织树混入
import { treeData2API } from "@/api/system/common";
import { getTreeConfigInfo } from '@/util/auth'
const treeConfigs = getTreeConfigInfo()
  .filter((item) => item.type === "side")
  .map((item) => ({
    id: item.id,
    label: item.treeName,
    icon: item.icon,
    type: item.treeNodeNames,
  }));
export default {
  data() {
    return {
      treeData: [],
      // 左侧树形配置
      treeProps: {
        children: "children",
        label: "name",
        isLeaf: (data) => {
          if (data.childNum && Number(data.childNum) > 0) return false
          else return true
        }
      },
      treeType: 'AD0,AD1,AD2,AD3',
      defaultExpandedKeys: []
    }
  },
  created() {
    this.getTreeData(treeConfigs[0].type);
  },
  methods: {
    // 懒加载点击
    async treeLayzLoad(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region' }]);
      }
      let params = {
        nodeNames: this.treeType,
        nodeId: node.data.code,
      }
      // if (this.treeType === 'zuzhi') {
      //   params = {
      //     nodeNames: treeConfigs[1].treeNodeNames,
      //     nodeId: node.data.code,
      //   }

      // } else if (this.treeType === 'xinzheng') {
      //   params = {
      //     nodeNames: treeConfigs[3].treeNodeNames,
      //     nodeId: node.data.code,
      //   }
      // }
      const res = await treeData2API(params);
      if (res.code === 200) {
        // this.filterTree(res.data)
        resolve(res.data)
      }
    },
    // 组织树切换
    treeChange(type) {
      this.getTreeData(type)
    },
    // 获取树形列表
    async getTreeData(type) {
      this.treeType = type
      let params = {
        nodeNames: type,
        nodeId: 0,
      }
      // if (type === 'xinzheng') {
      //   params = {
      //     nodeNames: treeConfigs[3].treeNodeNames,
      //     nodeId: 0,
      //   }
      // } else if (type === 'zuzhi') {
      //   params = {
      //     nodeNames: treeConfigs[1].treeNodeNames,
      //     nodeId: 0,
      //   }
      // }
      const res = await treeData2API(params);
      if (res.code === 200) {
        this.treeData = res.data;
        this.treeData.forEach(item => {
          this.defaultExpandedKeys.push(item.code)
        })
        // this.filterTree(this.treeData);
      }
    },
    // 递归数据
    filterTree(treeData) {
      treeData.map((item) => {
        item.label = item.name;
        if (item.children) {
          this.filterTree(item.children);
        } else {
          return;
        }
      });
    },
    renderContent(h, { node, data, store }) {
      // 判断是否是总局
      if (data.id % 100000000 === 0) {
        return (
          <div class="custom-tree-node">
            <div>
              <svg-icon
                icon-class={"zongjv"}
                style="margin-right:10px;"
              ></svg-icon>
              <el-tooltip disabled={node.label.length > 13 ? false : true} class="item" effect="dark" content={node.label} placement="right-end">
                <span>{node.label}</span>
              </el-tooltip>
            </div>
          </div>
        );
        // 区县
      } else if (data.id % 1000000 === 0) {
        return (
          <div class="custom-tree-node">
            <div>
              <svg-icon
                icon-class={"zzjg"}
                style="margin-right:10px;"
              ></svg-icon>
              <el-tooltip disabled={node.label.length > 13 ? false : true} class="item" effect="dark" content={node.label} placement="right-end">
                <span>{node.label}</span>
              </el-tooltip>
            </div>
          </div>
        );
        // 乡镇
      } else if (data.id % 10000 === 0) {
        return (
          <div class="custom-tree-node">
            <div>
              <svg-icon
                icon-class={"zzjg"}
                style="margin-right:10px;"
              ></svg-icon>
              <el-tooltip disabled={node.label.length > 13 ? false : true} class="item" effect="dark" content={node.label} placement="right-end">
                <span>{node.label}</span>
              </el-tooltip>
            </div>
          </div>
        );
      } else {
        return (
          <div class="custom-tree-node">
            <div>
              <svg-icon
                icon-class={"qiye"}
                style="margin-right:10px;"
              ></svg-icon>
              <el-tooltip disabled={node.label.length > 13 ? false : true} class="item" effect="dark" content={node.label} placement="right-end">
                <span>{node.label}</span>
              </el-tooltip>
            </div>
          </div>
        );
      }
    },
  }
}

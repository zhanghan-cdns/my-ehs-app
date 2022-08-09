/*
* 字典混入文件
*/
import {fastGetDictAPI} from '@/api/system/dictionary'
import {turnHump} from '@/util/util'

export default {
  data() {
    let dictionary = this.$pageConfig(this.$route.path).dictionary
    let dict = {}
    for (let i = 0; i < dictionary.length; i++) {
      dict[turnHump(dictionary[i].toLocaleLowerCase())] = [];
    }
    return {
      // //  通用判断
      // commonJudge: [],
      // //  系统-菜单-权限类型
      // systemPermissionType: [],
      // //  通用-启用状态
      // commonUse: [],
      // //  系统-菜单-请求类型
      // systemReqType: [],
      // //  通用-数据来源
      // commonDataorigin: [],
      // //  粉尘种类
      // entDustType: [],
      // //  除尘器种类
      // entDustRemoverType: [],
      // //  涉及粉尘生产工艺
      // entDustProductionTech: [],
      // //  易导致事故类型
      // entAccidentType: [],
      // //  建筑结构
      // entBuildingStructure: [],
      // //  火灾等级
      // entFireHazardLevel: [],
      // //  耐火等级
      // entFireResistanceRating: [],
      // //  所属行业
      // entIndustry: [],
      ...dict
    }
  },
  created() {
    // 根据配置请求

    const {dictionary} = this.$pageConfig(this.$route.path)
    if (dictionary) {
      for (let i = 0; i < dictionary.length; i++) {
        let item = dictionary[i]
        // 大写转驼峰
        let dict = turnHump(item.toLocaleLowerCase())
        this.getDicMap(dictionary[i], dict)
      }
    }
  },
  methods: {
    // 获取字典Map
    async getDicMap(key, target) {
      const res = await fastGetDictAPI(key)
      if (res.data && res.code === 200) {
        this[target] = res.data
      }
    },
  }
}

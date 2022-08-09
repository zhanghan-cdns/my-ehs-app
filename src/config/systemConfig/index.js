// 多环境配置
// 引入环境配置
import { getDevEnvironmentConfig } from './dev'
import { getEhsEnvironmentConfig } from './ehs'
// 当前环境路径配置
const modeUrlObj = {
  // 开发环境
  dev: {
    ...getDevEnvironmentConfig()
  },
  // 五位一体配置
  ehs: {
    ...getEhsEnvironmentConfig()
  }
}
export default modeUrlObj[process.env.VUE_APP_TITLE]
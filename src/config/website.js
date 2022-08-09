/**
 * 全局配置文件
 */
export default {
  title: "安全生产管理信息系统",//系统名称
  bgPic1: '/img/bg/loginbg.jpg',
  bgPic2: '/img/bg/denglu-left-bg.png',
  copyright:'测试版权',
  logo: require('@/assets/images/logo.png'),//顶部logo
  key: 'zalk',//配置主键,目前用于存储
  indexTitle: 'Ehs Admin',
  clientId: 'client-app', // 客户端id
  clientSecret: 'qya360.com', // 客户端密钥
  tenantMode: true, // 是否开启租户模式
  tenantId: "000000", // 管理组租户编号
  captchaMode: false, // 是否开启验证码模式
  grant_type: 'password',//授权类型
  lockPage: '/lock',
  tokenTime: 3000,
  tokenHeader: 'Authorization',
  //http的status默认放行列表
  statusWhiteList: [],
  //配置首页不可关闭
  isFirstPage: false,
  fistPage: {
    label: "首页",
    value: "/wel/index",
    params: {},
    query: {},
    meta: {
      i18n: 'dashboard'
    },
    group: [],
    close: false
  },
  //配置菜单的属性
  menu: {
    iconDefault: 'iconfont icon-caidan',
    props: {
      label: 'label',
      path: 'path',
      icon: 'icon',
      children: 'children',
      child: 'child'
    }
  },
  // 第三方系统授权地址
  authUrl: 'http://localhost/blade-auth/oauth/render',
  // 流程设计器地址
  flowDesignUrl: 'http://localhost:9999',
  // 报表设计器地址(cloud端口为8108,boot端口为80)
  reportUrl: 'http://localhost:8108/ureport',
  // 左侧search-tree 配置

}

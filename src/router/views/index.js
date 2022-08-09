import Layout from '@/page/index/'
import roleDistribute from "@views/system/role/roleDistribute";

export default [{
    path: '/wel',
    component: Layout,
    redirect: '/wel/index',
    children: [{
      path: 'index',
      name: '首页',
      meta: {
        i18n: 'dashboard'
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/wel/index')
    }]
  },
  //企业信息编辑页面
  {
    path: '/editorPage',
    component: Layout,
    redirect: '/editorPage/index',
    children: [{
      path: 'index',
      name: '编辑',
      meta: {
        keepAlive: true,
        isTab: false,
        isAuth: false
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/personnel/editorPage/index')
    }, ]
  },
  {
    path: '/riskDetails',
    component: Layout,
    children: [{
      path: '/riskDetails',
      name: '风险详情',
      meta: {
        keepAlive: true,
        isTab: false,
        isAuth: false
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/doubleprevention/riskclamancon/riskarea/riskDetails/index')
    }]
  },
  // 角色分配页面
  {
    path: '/roleDistribute',
    component: Layout,

    children: [{
      meta: {
        keepAlive: true,
        isTab: false,
        isAuth: false
      },
      path: '/roleDistribute',
      name: '角色分配',
      component: () =>
        import( /* webpackChunkName: "views" */ '@views/system/role/roleDistribute')
    }]
  },
  {
    path: '/sdsDetails',
    component: Layout,
    children: [{
      path: '/sdsDetails',
      name: 'sds详情',
      meta: {
        keepAlive: true,
        isTab: false,
        isAuth: false
      },
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/safetyscience/sds/sdsView')
    }]
  },
]

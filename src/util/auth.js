import Cookies from 'js-cookie'
import context from '../main.js'
const TokenKey = 'saber-access-token'
const RefreshTokenKey = 'saber-refresh-token'
export function getToken() {
  return window.sessionStorage.getItem('saber-token')
}

export function setToken(token) {
  return window.sessionStorage.setItem('saber-token', token)
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

export function setRefreshToken(token) {
  return Cookies.set(RefreshTokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey)
}
// 设置系统配置
export function setSystemConfigInfo(config) {
  return window.sessionStorage.setItem('system-config', config)
}
// 设置系统参数
export function setSystemConfigParams(res) {
  let params = {
    bgPic1: res.data.bgPic1.url,
    bgPic2: res.data.bgPic2.url,
    logo: res.data.logo.url,
    sysName: res.data.sysName,
    copyright: res.data.copyright,
    treeConfigs: res.data.treeConfigs,
    appId: res.data.appId,
    slDomainHandBook:
      JSON.stringify(res.data.slDomainHandBook) === "{}"
        ? ""
        : res.data.slDomainHandBook.originalFilename +
        "|" +
        res.data.slDomainHandBook.url,
    entOperationManual:
      JSON.stringify(res.data.entOperationManual) === "{}"
        ? ""
        : res.data.entOperationManual.originalFilename +
        "|" +
        res.data.entOperationManual.url,
    govOperationManual:
      JSON.stringify(res.data.originalFilename) === "{}"
        ? ""
        : res.data.govOperationManual.originalFilename +
        "|" +
        res.data.govOperationManual.url,
  };
  return params
}
// 读取系统配置
export function getSystemConfigInfo() {
  return JSON.parse(window.sessionStorage.getItem('system-config'))
}
// 读取树形配置
export function getTreeConfigInfo() {
  if (context.$store.getters.currentUserInfo.treeConfigs) {
    return context.$store.getters.currentUserInfo.treeConfigs
  } else {
    return []
  }
}
// 1.根据路由查到menus中的id
// 2.根据id查找permission中的项
// 3.filter出权限信息 获取权限数组
// 4.对相应组件添加指令是否可以展示
export function getCurrentPageAuth(menu, path, key) {
  let result = {}
  function getPageAuth(menu, path, key) {
    menu.forEach(function (obj, i) {
      if (obj[key] === path) {
        result = obj
        return false
      } else {
        var childrenLen = obj.children && obj.children.length
        if (childrenLen) {
          getPageAuth(obj.children, path, key)
        }
      }
    })
  }
  getPageAuth(menu, path, key)
  return result
}
export function getAuthInfo() {
  let menu = context.$store.getters.menuAll
  // console.log(menu,'context.$store.getters.menuAll')
  let permissionList = context.$store.getters.permission
  // console.log(permissionList,'permissionList')
  // let route = window.location.href.split("/#")[1]
  const route = context.$route.path
  const { id } = (getCurrentPageAuth(menu, route, 'path'))
  const permission = getCurrentPageAuth(permissionList, id, 'id')
  // console.log(permission,'permission')
  let authList = []
  if (permission.children) {
    authList = permission.children.map(child => child.permissionCode.split(":")[child.permissionCode.split(":").length - 1])
  }
  // console.log("authList",authList)
  return authList
}
//判断用户类型
export function getUserType() {
  //0是超级管理员 1是政府端 2是企业 3网格 4桥长
  let currentUserInfo = context.$store.getters.currentUserInfo
  for (let i = 0; i < currentUserInfo.sysRoles.length; i++) {
    let item = currentUserInfo.sysRoles[i]
    const roleList = ['ADMIN', 'ENT', 'GRID', 'BRIDGE', 'ORG']
    if (item.roleCode === 'ADMIN') return 0
    let role = item.roleCode.split('_')[0]
    let result = roleList.filter(roleItem => roleItem === role)
    if (result[0] === 'ENT') {
      return 2
    } else if (result[0] === 'ORG') {
      return 1
    } else if (result[0] === 'GRID') {
      return 3
    } else if (result[0] === 'BRIDGE') {
      return 4
    }
  }
}

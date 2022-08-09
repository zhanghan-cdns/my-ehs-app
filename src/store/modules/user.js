import {setToken, setRefreshToken, removeToken, removeRefreshToken} from '@/util/auth'
import {Message} from 'element-ui'
import {setStore, getStore} from '@/util/store'
import {isURL, validatenull} from '@/util/validate'
import website from '@/config/website'
import {loginByUsername, refreshToken, getUserInfoAPI, loginOutAPI} from '@/api/system/login'
import {menuListAPI, buttonListAPI} from '@/api/system/menu'
import context from '@/main'
import {getToken} from '@/util/auth'

function addPath(ele, first) {
  const menu = website.menu;
  const propsConfig = menu.props;
  const propsDefault = {
    label: propsConfig.label || 'name',
    path: propsConfig.path || 'path',
    icon: propsConfig.icon || 'icon',
    children: propsConfig.children || 'children'
  }
  const icon = ele[propsDefault.icon];
  ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon;
  const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
  if (!isChild) {
    ele[propsDefault.children] = [];
  }
  if (!isChild && first && !isURL(ele[propsDefault.path])) {
    ele[propsDefault.path] = ele[propsDefault.path] + '/index'
  } else {
    ele[propsDefault.children].forEach(child => {
      addPath(child);
    })
  }
}

// 权限信息
const user = {
  state: {
    tenantId: getStore({name: 'tenantId'}) || '',
    userInfo: getStore({name: 'userInfo'}) || [],
    currentUserInfo: getStore({name: 'currentUserInfo'}) || {},
    permission: getStore({name: 'permission'}) || {},
    roles: [],
    menuId: {},
    menuChildren:getStore({name: 'menuChildren'}) || [],
    menu: getStore({name: 'menu'}) || [],
    menuAll: getStore({name: 'menuAll'}) || [],
    token: getStore({name: 'token'}) || '',
    refreshToken: getStore({name: 'refreshToken'}) || '',
  },
  actions: {
    // 登录后获取用户信息
    getCurrentUserInfo({commit}) {
      return new Promise((resolve) => {
        getUserInfoAPI().then(res => {
          if (res && res.code === 200) {
            commit('SET_CURRENT_USERINFO', res.data)
            resolve();
          }
        }).catch(() => {
          commit('SET_TOKEN', '');
          removeToken();
          commit('SET_MENU', []);
          commit('SET_MENU_ALL_NULL', []);
          commit('SET_TAG_LIST', []);
          commit('DEL_ALL_TAG');
          context.$loading({
            lock: true,
            text: "登录中,请稍后。。。",
            spinner: "el-icon-loading",
          }).close();
        })
      })
    },
    //根据用户名登录
    LoginByUsername({commit, dispatch}, userInfo) {
      return new Promise((resolve, reject) => {
        // loginByUsername(userInfo.tenantId, userInfo.username, md5(userInfo.password), userInfo.type, userInfo.key, userInfo.code).then(res => {
        loginByUsername({...userInfo}).then(res => {
          const data = res;
          if (data.code !== 200) {
            Message({
              message: data.msg,
              type: 'error'
            })
          } else {
            commit('SET_TOKEN', data.data.tokenHead + data.data.token);
            commit('SET_REFRESH_TOKEN', data.data.expiresIn);
            commit('SET_USER_INFO', data.data);
            commit('DEL_ALL_TAG');
            commit('CLEAR_LOCK');
          }
          resolve();
        }).catch(error => {
          commit('SET_TOKEN', '');
          removeToken();
          commit('SET_MENU', []);
          commit('SET_MENU_ALL_NULL', []);
          commit('SET_TAG_LIST', []);
          commit('DEL_ALL_TAG');
          context.$loading({
            lock: true,
            text: "登录中,请稍后。。。",
            spinner: "el-icon-loading",
          }).close();
          reject(error);
        })
      })
    },
    //根据手机号登录
    LoginByPhone({commit}, userInfo) {
      return new Promise((resolve) => {
        loginByUsername(userInfo.phone, userInfo.code).then(res => {
          const data = res.data;
          commit('SET_TOKEN', data);
          commit('DEL_ALL_TAG');
          commit('CLEAR_LOCK');
          resolve();
        })
      })
    },
    //刷新token
    refreshToken({state, commit}) {
      return new Promise((resolve, reject) => {
        refreshToken(state.refreshToken, state.tenantId).then(res => {
          const data = res.data;
          commit('SET_TOKEN', data.access_token);
          commit('SET_REFRESH_TOKEN', data.refresh_token);
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({commit}) {
      let completeToken = getToken()
      let token = completeToken.slice(7,completeToken.length)
      loginOutAPI(token).then(() => {
        commit('SET_TOKEN', '');
        commit('SET_MENU', []);
        commit('SET_MENU_ALL_NULL', []);
        commit('SET_ROLES', []);
        commit('SET_TAG_LIST', []);
        commit('DEL_ALL_TAG');
        commit('CLEAR_LOCK');
        removeToken();
        removeRefreshToken();
        window.sessionStorage.removeItem("topMenuId");
      }).catch(err => {
        console.log(err)
      })
    },
    //注销session
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_MENU_ALL_NULL', []);
        commit('SET_MENU', []);
        commit('SET_ROLES', []);
        commit('SET_TAG_LIST', []);
        commit('DEL_ALL_TAG');
        commit('CLEAR_LOCK');
        removeToken();
        removeRefreshToken();
        resolve();
      })
    },
    //获取顶部菜单
    // GetTopMenu() {
    //   return new Promise(resolve => {
    //     getTopMenu().then((res) => {
    //       const data = res.data || [];
    //       resolve(data)
    //     })
    //   })
    // },
    //获取系统菜单
    GetMenu({commit, dispatch}, topMenuId) {
      return new Promise(resolve => {
        menuListAPI({parentId:topMenuId}).then((res) => {
          // 获取权限接口
          if (res.code !== 200) return this.$message.error('获取菜单失败')
          const menu = res.data
          // 将权限信息挂载到menus上
          menu.forEach(ele => {
            addPath(ele, true);
          });
          // 存入菜单
          commit('SET_MENU', menu)
          commit('SET_MENU_ALL', menu)
          // 更新权限
          dispatch('GetButtons');
          resolve(menu)
        })
      })
    },
    //获取系统按钮
    GetButtons({commit}) {
      return new Promise((resolve) => {
        buttonListAPI().then(res => {
          const data = res.data||[];
          commit('SET_PERMISSION', data);
          resolve();
        })
      })
    },
  },
  mutations: {
    SET_MENU_CHILDREN:(state, menuChildren)=>{
      state.menuChildren = menuChildren;
      setStore({name: 'menuChildren', content: state.menuChildren})
    },
    SET_CURRENT_USERINFO: (state, userinfo) => {
      state.currentUserInfo = userinfo;
      setStore({name: 'currentUserInfo', content: state.currentUserInfo})
    },
    // 设置token
    SET_TOKEN: (state, token) => {
      setToken(token);
      state.token = token;
      setStore({name: 'token', content: state.token})
    },
    SET_MENU_ID(state, menuId) {
      state.menuId = menuId;
    },
    SET_MENU_ALL: (state, menuAll) => {
      let menu = state.menuAll;
      menuAll.forEach(ele => {
        if (!menu.find(item => item.label === ele.label && item.path === ele.path)) {
          menu.push(ele);
        }
      })

      state.menuAll = menu
        setStore({name: 'menuAll', content: state.menuAll})
    },
    SET_MENU_ALL_NULL: (state) => {
      state.menuAll = []
      setStore({name: 'menuAll', content: state.menuAll})
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
      setStore({name: 'menu', content: state.menu})
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
      setRefreshToken(refreshToken)
      state.refreshToken = refreshToken;
      setStore({name: 'refreshToken', content: state.refreshToken})
    },
    SET_TENANT_ID: (state, tenantId) => {
      state.tenantId = tenantId;
      setStore({name: 'tenantId', content: state.tenantId})
    },
    SET_USER_INFO: (state, userInfo) => {
      if (validatenull(userInfo.avatar)) {
        userInfo.avatar = "/img/bg/img-logo.png";
      }
      state.userInfo = userInfo;
      setStore({name: 'userInfo', content: state.userInfo})
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = permission
      setStore({name: 'permission', content: state.permission})
    }
  }

}
export default user

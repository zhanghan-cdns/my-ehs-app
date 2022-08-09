import request from '@/router/axios';
import website from "@/config/website";

// 登录接口
  export const loginByUsername = params => request({
  url: "/api/auth/oauth/token",
  method: "post",
  params:{
    ...params,
    client_id:website.clientId,
    client_secret:website.clientSecret,
    grant_type:website.grant_type
  }
})
// 登出
export const loginOutAPI = token => request({
  url: "/api/auth/logout",
  method: "post",
  params:{
    access_token:token
  },
  meta:{
    isToken:false
  }
})
// 获取用户信息
export const getUserInfoAPI = params => request({
  url: "/api/system/user/getcurrentuser",
  method: "get",
  params: params,

})
// 刷新token
export const refreshToken = token => request({
  url: "/api/auth/oauth/token",
  method: "get",
  params: {
    client_id:website.clientId,
    client_secret:website.clientSecret,
    grant_type:website.grant_type,
    refresh_token:token
  }
})


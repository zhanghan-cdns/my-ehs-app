import { getAuthInfo } from "@/util/auth";
export const permission = {
  inserted(el, binding) {
    // inserted → 元素插入的时候
    let permission = binding.value // 获取到 v-permission的值
    if (permission) {
      let hasPermission = getAuthInfo().some(item => item === permission)
      if (!hasPermission) {
        // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('需要传key')
    }
  },
  update(el, binding) {
    // inserted → 元素插入的时候
    let permission = binding.value // 获取到 v-permission的值
    if (permission) {
      let hasPermission = getAuthInfo().some(item => item === permission)
      if (!hasPermission) {
        // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('需要传key')
    }
  }
}

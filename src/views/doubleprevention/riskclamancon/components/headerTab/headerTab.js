import {ref} from "@vue/composition-api/dist/vue-composition-api";

export const handleTab = (props, ctx) => {
  const tabType = ref(0)
  const setType = (value) => {
    tabType.value = value
    ctx.emit('setType', value)
  }
  const headerButtonMethods = (type) => {
    ctx.emit('headerButtonMethods', type)
  }
  return {
    tabType,
    setType,
    headerButtonMethods
  }
}

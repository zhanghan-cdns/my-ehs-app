import {ref} from "@vue/composition-api/dist/vue-composition-api";

export function useDialog() {
  const openEdit = ref(false)
  const openMethods = (row, call) => {
    openEdit.value = true
    if (call) {
      call()
    }
  }
  const closeMethods = (call) => {
    openEdit.value = false
    if (call && typeof call === "function") {
      call()
    }
  }
  return {
    openMethods,
    openEdit,
    closeMethods
  }
}

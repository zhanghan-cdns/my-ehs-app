import {ref} from "@vue/composition-api/dist/vue-composition-api";

const size = ref('small')
export const useForm = () => {
  const setSize = (newSize) => {
    size.value = newSize
  }
  return {
    size,
    setSize
  }
}

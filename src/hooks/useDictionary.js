import { reactive, toRefs } from "@vue/composition-api";
import { turnHump } from "@/util/util";
import Vue from "vue";
import { fastGetDictAPI } from "@/api/system/dictionary";

export function useDictionary(context) {
  let commonConfig = Vue.prototype.$pageConfig(context.root._route.path);
  if (!commonConfig.dictionary || !context) {
    throw new Error(
      "dictionary does not exist in pageConfig or context is undefined"
    ); //传入message
  }
  let dict = {};
  // 获取配置项目里所有的字典键
  for (let i = 0; i < commonConfig.dictionary.length; i++) {
    dict[turnHump(commonConfig.dictionary[i].toLocaleLowerCase())] = [];
  }
  // 推入reactive
  const state = reactive({
    ...dict,
  });
  const getDicMap = async (key, target) => {
    const res = await fastGetDictAPI(key);
    if (res.data && res.code === 200) {
      state[target] = res.data;
    }
  };
  for (let i = 0; i < commonConfig.dictionary.length; i++) {
    let item = commonConfig.dictionary[i];
    // 大写转驼峰
    let dict = turnHump(item.toLocaleLowerCase());
    getDicMap(commonConfig.dictionary[i], dict);
  }
  console.log("-----------");
  console.log(state, "字典项");
  console.log("-----------");

  return {
    ...toRefs(state),
  };
}

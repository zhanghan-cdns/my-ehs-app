<template>
  <header>
    <div>
      <el-button
        v-for="(item,index) in tabButtonList"
        :key="item.type"
        :type="tabType===index?'primary':''"
        :size="size"
        @click="setType(index)"
      >
        {{ item.title }}
      </el-button>
    </div>
    <header-container>
      <header-search
        v-for="(item,index) in tabButtonList"
        v-show="tabType===index"
        :key="item.type"
        :searchData="item.searchData"
        :searchItem="item.searchItem"
      />
      <header-button
        v-if="headerButtonList"
        :headerButtonList="headerButtonList"
        @headerButtonClick="headerButtonMethods"
      />
      <header-button
        v-else
        @headerButtonClick="headerButtonMethods"
      />
    </header-container>
  </header>
</template>

<script>
import {handleTab} from "@views/doubleprevention/riskclamancon/components/headerTab/headerTab";
import {useForm} from "@/hooks/useForm";
import headerContainer from "@views/enterprise/dust/components/HeaderContainer";
export default {
  components:{headerContainer},
  props: {
    tabButtonList: {
      type: Array,
      default: () => []
    },
    headerButtonList: {
      type: Array,
    }
  },
  setup(props, ctx) {
    const {size} = useForm()
    const {setType, tabType, headerButtonMethods} = handleTab(props, ctx)
    return {
      setType,
      tabType,
      headerButtonMethods,
      size
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  padding: 10px 0;
}


</style>

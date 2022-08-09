<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-tab-task
          :headerButtonList="headerButtonList"
          :tabButtonList="tabButtonList"
          @headerButtonMethods="headerButtonMethods"
          @setType="setType"
        ></header-tab-task>
        <public-checklist
          v-if="tabType===0"
          @operateButtonClick="operateButtonClick"
        ></public-checklist>
        <enterprise-self-increment-table
          v-if="tabType===1"
          @operateButtonClick="operateButtonClick"
        ></enterprise-self-increment-table>
        <view-public-check-list
          ref="viewPublicCheckListRef"
          :dictConfig={doublePreventionRiskLevel}
          :disabledForm="disabledForm"
          :isEnt="isEnt"
        ></view-public-check-list>
      </template>
    </list-container>
  </div>
</template>

<script>
import viewPublicCheckList
  from "@views/doubleprevention/riskclamancon/inspcontenttablelibrary/components/viewPublicCheckList";
import publicChecklist from "@views/doubleprevention/riskclamancon/inspcontenttablelibrary/components/publicChecklist";
import headerTabTask from "@views/doubleprevention/riskclamancon/components/headerTab/headerTab.vue";
import {reactive, ref, toRefs} from "@vue/composition-api/dist/vue-composition-api";
import {handleTab} from "@views/doubleprevention/riskclamancon/components/headerTab/headerTab";
import enterpriseSelfIncrementTable
  from "@views/doubleprevention/riskclamancon/inspcontenttablelibrary/components/enterpriseSelfIncrementTable";
import {useDictionary} from "@/hooks/useDictionary";

export default {
  name: "inspcontenttablelibrary",
  components: {
    headerTabTask,
    enterpriseSelfIncrementTable,
    publicChecklist,
    viewPublicCheckList
  },
  setup(props, ctx) {
    const {doublePreventionRiskLevel} = useDictionary(ctx)
    const viewPublicCheckListRef = ref(null)
    const isEnt = ref(false)
    const disabledForm = ref(true)
    const state = reactive({
      tabButtonList: [
        {
          title: '公共检查表',
          searchData: {},
          searchItem: [
            {
              prop: "riskLevel",
              type: "Select",
              placeholder: "隐患级别",
              disabled: false,
              width: "180px",
              children: [],
            },

            {
              prop: "checkUnit",
              type: "Select",
              placeholder: "检查单元",
              disabled: false,
              width: "180px",
              children: [],
            },
          ],
        },
        {
          title: '企业自增表',
          searchData: {},
          searchItem: [
            {
              prop: "riskLevel",
              type: "Select",
              placeholder: "隐患级别",
              disabled: false,
              width: "180px",
              children: [],
            },

            {
              prop: "checkUnit",
              type: "Select",
              placeholder: "检查单元",
              disabled: false,
              width: "180px",
              children: [],
            },
          ],
        },
      ],
      headerButtonList: ["chaxun", "xinzeng", "chongzhi"]
    })
    const headerButtonMethods = (type) => {
      console.log(type, 'type')
      console.log(tabType.value)
    }
    const {tabType} = handleTab()
    const setType = (value) => {
      tabType.value = value
      if (value === 0) {
        state.headerButtonList = ["chaxun", "daochu", "chongzhi"]
      } else {
        state.headerButtonList = ["daoru", "daochu", "chaxun", "xinzeng", "chongzhi"]
      }
    }
    const operateButtonClick = ({type, row}) => {
      console.log("------------")
      console.log(type, row)
      console.log(tabType.value)
      console.log("------------")
      if (type === 'chakan') {
        isEnt.value = tabType.value !== 0;
        disabledForm.value = true
        viewPublicCheckListRef.value.openMethods(() => {
          viewPublicCheckListRef.value.rowData = row
        })
      } else if (type === 'bianji') {
        isEnt.value = true
        disabledForm.value = false
        viewPublicCheckListRef.value.openMethods(() => {
          viewPublicCheckListRef.value.rowData = row
        })
      } else if (type === 'shanchu') {
        console.log(type)
      }
    }
    return {
      headerButtonMethods,
      operateButtonClick,
      setType,
      ...toRefs(state),
      tabType,
      doublePreventionRiskLevel,
      viewPublicCheckListRef,
      disabledForm,
      isEnt
    }
  }
}
</script>

<style scoped>

</style>
